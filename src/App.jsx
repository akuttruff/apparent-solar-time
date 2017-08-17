import React, { Component } from 'react';
import Form from './Form.jsx';
import Table from './Table.jsx';
import $ from 'jquery';
import { apiKey } from '../config.js';

class App extends Component {
    constructor() {
        super();

        this.state = {
            range: {},
            data: {}
        }
    }

    fetchTimeZone( lat, lng ) {
        $.ajax({
            url: `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`,
            type: 'GET',
            success: (data) => this.setState({ data })
        });
    }

    onFetchLocationSuccess(data) {
        const { lat, lng } = data.results[0].geometry.location;
        this.fetchTimeZone(lat, lng);
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
        return (
            <div>
                <Form fetchLocation={this.fetchLocation.bind(this)}
                      onRangeChange={this.onRangeChange.bind(this)}/>
                <Table data={this.state.data}
                       range={this.state.range}/>
            </div>
        );
    }
}
export default App;