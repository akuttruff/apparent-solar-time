import React, { Component } from 'react';
import moment from 'moment';
import $ from 'jquery';
import _ from 'lodash';
import { timezoneApiKey } from '../config.js';

function sortDataByDate(solarData) {
    return _.sortBy(solarData, (data) => {
        return new moment(data.date)
    }).reverse();
}

function findNauticalNoon(solarNoon, twilight) {
    const startTime = moment(solarNoon);
    const endTime = moment(twilight);
    var duration = moment.duration(endTime.diff(startTime));
    return duration.asHours();
}

function formatTime(time) {
    const { solarData, geoData } = this.props;
    getTimezone(solarData, geoData);
}

function onTimezoneSuccess(data) {

}

function HeaderRow() {
    return (
        <tr className="header">
            <td> Date:</td>
            <td> Sunrise:</td>
            <td> Sunset:</td>
            <td> rfNauticalNoon:</td>
            <td> Length:</td>
        </tr>
    );
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {solarData: [], geoData: []};
    }



    render() {
        const { solarData } = this.props;
        const sortedData = sortDataByDate(solarData);

        const dataRows = sortedData.map((day) => {

            const { date, sunrise, sunset, solar_noon, day_length, nautical_twilight_end } = day.data.results;
            const rfNauticalAfternoon = findNauticalNoon(solar_noon, nautical_twilight_end);

            return (
                <tr className="data" key={date}>
                    <td > { date } </td>
                    <td> { sunrise } </td>
                    <td> { sunset } </td>
                    <td> { solar_noon } - { nautical_twilight_end } </td>
                    <td> { day_length } </td>
                </tr>
            );
        });

        return (
            <table>
                <tbody>
                <HeaderRow />
                { dataRows  }
                </tbody>
            </table>
        );
    }
}

export { Table, HeaderRow };