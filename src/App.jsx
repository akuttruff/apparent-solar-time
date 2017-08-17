import React, { Component } from 'react';
import Form from './Form.jsx';
import Table from './Table.jsx';
import $ from 'jquery';
import { apiKey } from '../config.js';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

class App extends Component {
    constructor() {
        super();

        this.state = {
            range: {},
            data: {}
        }
    }

    getDateRange({ startDate, endDate }) {
        const now = startDate.clone(), dates = [];

        while (now.isBefore(endDate) || now.isSame(endDate)) {
            dates.push(now.format('YYYY-MM-DD'));
            now.add('days', 1);
        }
        return dates;
    }

    fetchSolarData(lat, lng) {
        const dates = this.getDateRange(this.state.range);
        let solarData = [];

        dates.forEach((date) => {
            $.ajax({
                url: `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}`,
                type: 'GET',
                success: (data) => {
                    Object.assign(data.results, { date });
                    solarData.push({ data })
                }
            })
        });

        this.setState({ solarData })
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

    onRangeChange(range) {
        this.setState({ range });
    }

    render() {
        const { solarData } = this.state;
        console.log('app state', this.state)

        return (
            <div>
                <Form fetchLocation={this.fetchLocation.bind(this)}
                      onRangeChange={this.onRangeChange.bind(this)}/>
                { solarData && <Table solarData={this.state.solarData}/> }
            </div>
        );
    }
}
export default App;