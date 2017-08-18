import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

// the time elapsed from solar noon until the end of nautical twilight
function findNauticalNoon(solarNoon, twilight) {

}

function HeaderRow() {
    return (
        <tr>
            <td> Date:</td>
            <td> Sunrise:</td>
            <td> Sunset:</td>
            <td> rfNauticalAfternoon</td>
            <td> Day length:</td>
        </tr>
    );
}

function Table({ solarData }) {
    const sortedData = solarData.reverse();
    const dataRows = sortedData.map((day) => {
        const { date, sunrise, sunset, solar_noon, day_length, nautical_twilight_end } = day.data.results;
        const rfNauticalAfternoon = findNauticalNoon(solar_noon, nautical_twilight_end);

        return (
            <tr>
                <td > { date } </td>
                <td> { sunrise } </td>
                <td> { sunset } </td>
                <td> { rfNauticalAfternoon } </td>
                <td> { day_length } </td>
            </tr>
        );
    });

    return (
        <table>
            <HeaderRow />
            { dataRows  }
        </table>
    );
}

export default Table;