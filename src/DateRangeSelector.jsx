import React, { Component } from 'react';
import moment from 'moment';
import { DateRange } from 'react-date-range';

class DateRangeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            endDate: moment().add(7, 'days')
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(range){
        this.props.onRangeChange(range);
    }

    render(){
        return (
            <div>
                <DateRange
                    onInit={this.handleSelect}
                    onChange={this.handleSelect}
                />
            </div>
        )
    }
}

export default DateRangeSelector;