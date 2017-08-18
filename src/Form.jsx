import React, { Component } from 'react';
import DateRangeSelector from './DateRangeSelector.jsx';
import 'react-dates/lib/css/_datepicker.css';
import Table from './Table.jsx';
import _ from 'lodash';
import $ from 'jquery';
import { apiKey } from '../config.js';

class Form extends Component {
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

    fetchSolarData(lat, lng) {
        const dates = this.getDateRange(this.props.range);
        let solarData = [];

        dates.forEach((date) => {
            $.ajax({
                url: `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}`,
                type: 'GET',
                success: (data) => {
                    Object.assign(data.results, { date });
                    solarData.push({ data })
                    this.setState({ solarData });
                }
            })
        });
    }

    onFetchLocationSuccess(data) {
        const { lat, lng } = data.results[0].geometry.location;
        const formattedData = this.fetchSolarData(lat, lng);
    }

    fetchLocation(address) {
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
            type: 'GET',
            success: (data) => this.onFetchLocationSuccess(data)
        });
    }

    render() {
        const { address, range, solarData } = this.state;

        const rows = this.state.solarData.map((day) => {
            const { sunrise, sunset } = day.data.results;
            return (
                <div key={Math.random()}>
                    { sunrise }
                </div>
                );
        });

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.address} onChange={this.handleChange}/>
                    </label>
                    <DateRangeSelector onRangeChange={this.onRangeChange}/>
                    <input type="submit" value="Submit"/>
                </form>

                { rows }
            </div>
        )
    }
}

export default Form;
