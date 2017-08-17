import React, { Component } from 'react';

class Table extends Component {

    render() {
        const { data, range } = this.props;
        const { sunrise, sunset, solar_noon, day_length, nautical_twilight_begin } = data;

        return (
            <div>
                <h1></h1>
            </div>
        )
    }
}

export default Table;