import React, { Component } from 'react';
import moment from 'moment';
import { DateRange } from 'react-date-range';

class DateRangeSelector extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            startDate: moment(),
            endDate: moment().add(7, 'days')
        }
    }

    handleSelect(range){
        this.props.onRangeChange(range);
    }

    render(){
        const defaultStartDate = moment();
        const defaultEndDate = moment(defaultStartDate).add(7, 'days');
        const maxDate = this.state.startDate.add(14, 'days');

        return (
            <div>
                <DateRange
                    onInit={this.handleSelect}
                    onChange={this.handleSelect}
                    calendars={2}
                    linkedCalendars={true}
                    minDate={defaultStartDate}
                    maxDate={maxDate}
                    startDate={defaultStartDate}
                    endDate={defaultEndDate}
                />
            </div>
        )
    }
}

export default DateRangeSelector;