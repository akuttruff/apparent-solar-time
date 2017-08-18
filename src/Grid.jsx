import React, { Component } from 'react';
import DateRangeSelector from './DateRangeSelector.jsx';
import 'react-dates/lib/css/_datepicker.css';
import $ from 'jquery';
import { apiKey } from '../config.js';
import Table from './Table.jsx';
import moment from 'moment';

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
                    solarData.push({ data });
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

    renderTableData(solarData) {
        return <Table solarData={solarData} />
    }

    render() {
        const { address, range, solarData } = this.state;
        return (

            <div className="grid">
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="address">
                            <h2>Enter an address to calculate solar data</h2>
                            <label>
                                Example: "400 SW 6th Ave, Portland, OR 97204"
                            </label>
                            <input type="text" value={this.state.address} onChange={this.handleChange}/>
                        </div>
                        <DateRangeSelector onRangeChange={this.onRangeChange}/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                <div className="table">
                    { this.renderTableData(this.state.solarData) }
                </div>
            </div>
        )
    }
}

export default Form;
