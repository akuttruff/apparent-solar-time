import React, { Component } from 'react';
import DateRangeSelector from './DateRangeSelector.jsx';
import 'react-dates/lib/css/_datepicker.css';
import $ from 'jquery';
import { geocodeApiKey, timezoneApiKey } from '../config.js';
import { Table } from './Table.jsx';
import moment from 'moment';

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
        this.fetchLocation(this.state.address)
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

    getTimezone(solarData, lat, lng) {
        const timestamp = moment().unix();
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${timezoneApiKey}`,
            type: 'GET',
            success: (data) => {

                solarData.forEach((date) => {
                    Object.assign(date.data.results, { timeZoneId: data.timeZoneId })
                });
                this.setState({ solarData });
            }
        })
    }

    fetchSolarData(lat, lng) {
        const dates = this.getDateRange(this.props.range);
        let solarData = [];

        dates.forEach((date) => {
            $.ajax({
                url: `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}`,
                type: 'GET',
                success: (data) => {
                    Object.assign(data.results, { date });
                    solarData.push({ data });
                    this.setState({ solarData });
                    this.getTimezone(solarData, lat, lng)
                }
            })
        });
    }

    onFetchLocationSuccess(geoData) {
        const { lat, lng } = geoData;
        this.fetchSolarData(lat, lng);
    }

    fetchLocation(address) {
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocodeApiKey}`,
            type: 'GET',
            success: (data) => {
                const geoData = data.results[0].geometry.location;
                this.setState({ geoData });
                this.onFetchLocationSuccess(geoData);
            }
        });
    }

    renderTableData(solarData, geoData) {
        return <Table solarData={solarData} />
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
                            <input type="text" value={this.state.address} onChange={this.handleChange}/>
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
                    { this.renderTableData(this.state.solarData, this.state.geoData) }
                </div>
            </div>
        )
    }
}

export default App;
