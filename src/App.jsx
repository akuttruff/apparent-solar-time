import React, { Component } from 'react';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import 'moment-timezone'
import $ from 'jquery';
import { geocodeApiKey, timezoneApiKey } from '../config.js';
import DateRangeSelector from './DateRangeSelector.jsx';
import { Table } from './Table.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {address: '', range: {}, solarData: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onRangeChange = this.onRangeChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.getLocation(this.state.address)
    }

    handleChange(event) {
        this.setState({address: event.target.value});
    }

    onRangeChange(range) {
        this.setState({ range });
    }

    getDateRange() {
        const now = this.state.range.startDate.clone(), dates = [];

        while (now.isBefore(this.state.range.endDate) || now.isSame(this.state.range.endDate)) {
            dates.push(now.format('YYYY-MM-DD'));
            now.add('days', 1);
        }
        return dates;
    }

    formatTimes(solarData, timezone) {
        return solarData.map((day) => {
            const { date, sunrise, sunset, solar_noon, day_length, nautical_twilight_end } = day.data.results;
            const displayFormat = 'h:mm:ss A';

            return {
                date,
                sunrise: moment.tz(`${ date } ${sunrise}`, timezone).format(displayFormat),
                sunset: moment.tz(`${ date } ${sunset}`, timezone).format(displayFormat),
                solar_noon: moment.tz(`${ date } ${solar_noon}`, timezone).format(displayFormat),
                nautical_twilight_end: moment.tz(`${ date } ${nautical_twilight_end}`, timezone).format(displayFormat),
                day_length
            };
        });
    }

    getTimezone(solarData, lat, lng) {
        const timestamp = moment().unix();
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${timezoneApiKey}`,
            type: 'GET',
            success: (data) => {
                const { timeZoneId } = data;
                const formattedData = this.formatTimes(solarData, timeZoneId);
                this.setState({ solarData: formattedData });
            }
        })
    }

    getSolarData(lat, lng) {
        const dates = this.getDateRange(this.props.range);
        let solarData = [];

        dates.forEach((date) => {
            $.ajax({
                url: `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}`,
                type: 'GET',
                success: (data) => {
                    Object.assign(data.results, { date });
                    solarData.push({ data });
                    this.getTimezone(solarData, lat, lng)
                }
            })
        });
    }

    getLocation(address) {
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocodeApiKey}`,
            type: 'GET',
            success: (data) => {
                const geoData = data.results[0].geometry.location;
                const { lat, lng } = geoData;
                this.getSolarData(lat, lng);
            }
        });
    }

    render() {
        const { address, range, solarData } = this.state;
        return (

            <div className="grid">
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="address">
                            <div className="header">Calculate Apparent Solar Time</div>
                            <label>
                                1. Enter an address as close as possible to the desired area
                            </label>
                            <input type="text" value={address} onChange={this.handleChange}/>
                            <span className="example-text">
                                Example: 2206 N Skidmore Ct, Portland, OR 97217
                            </span>
                            <label>
                                2. Enter a date range of up to 14 days
                            </label>
                            <DateRangeSelector onRangeChange={this.onRangeChange}/>
                        </div>
                        <input type="submit" value="Calculate"/>
                    </form>
                </div>
                <div className="table">
                    <Table solarData={solarData}/>
                </div>
            </div>
        )
    }
}

export default App;
