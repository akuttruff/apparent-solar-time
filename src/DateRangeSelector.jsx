import React, { Component } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates'

class DateRangeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedInput: null,
            startDate: moment(),
            endDate: moment().add(7, 'days')
        };
    }

    handleRangeChange(startDate, endDate) {
        this.setState({ startDate, endDate });
        this.props.onRangeChange({startDate, endDate})
    }

    render() {
        return (
            <DateRangePicker
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDatesChange={({ startDate, endDate }) => this.handleRangeChange(startDate, endDate)}
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
                minimumNights={7}
            />
        )
    }
}

export default DateRangeSelector;