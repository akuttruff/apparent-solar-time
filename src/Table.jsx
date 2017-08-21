import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import 'moment-timezone'

function sortDataByDate(solarData) {
    return _.sortBy(solarData, (data) => {
        return new moment(data.date)
    }).reverse();
}

function HeaderRow() {
    return (
        <tr className="header">
            <td> Date</td>
            <td> Sunrise</td>
            <td> Sunset</td>
            <td> rfNauticalNoon</td>
            <td> Day Length</td>
        </tr>
    );
}

function Table({ solarData }) {
    const sortedData = sortDataByDate(solarData);
    const dataRows = sortedData.map((day) => {

        const { date, sunrise, sunset, solar_noon, day_length, nautical_twilight_end } = day;

        return (
            <tr className="data" key={date}>
                <td id="date">{ date }</td>
                <td id="sunrise">{ sunrise }</td>
                <td id="sunset">{ sunset }</td>
                <td id="nautical-noon">{ solar_noon } - { nautical_twilight_end }</td>
                <td id="day-length">{ day_length } (H:M:S)</td>
            </tr>
        );
    });

    return (
        <table>
            <tbody>
            { !_.isEmpty(solarData) && <HeaderRow /> }
            { dataRows  }
            </tbody>
        </table>
    );
}

export { Table, HeaderRow };