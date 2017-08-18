import React, { Component } from 'react';
import moment from 'moment';
import { DateRange } from 'react-date-range';

class DateRangeSelector extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(range){
        this.props.onRangeChange(range);
    }

    render(){
        const defaultStartDate = moment();
        const defaultEndDate = moment(defaultStartDate).add(7, 'days')

        return (
            <div>
                <DateRange
                    onInit={this.handleSelect}
                    onChange={this.handleSelect}
                    calendars={2}
                    linkedCalendars={true}
                    startDate={defaultStartDate}
                    endDate={defaultEndDate}
                />
            </div>
        )
    }
}

export default DateRangeSelector;