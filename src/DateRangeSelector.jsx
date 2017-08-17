import React, { Component } from 'react';
import moment from 'moment';
import { DateRange } from 'react-date-range';

class DateRangeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedInput: null,
            startDate: moment(),
            endDate: moment().add(7, 'days')
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(range){
        this.props.onRangeChange(range);
        // An object with two keys,
        // 'startDate' and 'endDate' which are Momentjs objects.
    }

    render(){
        return (
            <div>
                <DateRange
                    onInit={() => {}}
                    onChange={this.handleSelect}
                />
            </div>
        )
    }

    // constructor(props) {
    //     super(props);
    //
    // }
    //
    // handleRangeChange(startDate, endDate) {
    //     this.setState({ startDate, endDate });
    //     this.props.onRangeChange({startDate, endDate})
    // }
    //
    // render() {
    //     return (
    //         <DateRangePicker
    //             startDate={this.state.startDate}
    //             endDate={this.state.endDate}
    //             onDatesChange={({ startDate, endDate }) => this.handleRangeChange(startDate, endDate)}
    //             focusedInput={this.state.focusedInput}
    //             onFocusChange={focusedInput => this.setState({ focusedInput })}
    //         />
    //     )
    // }
}

export default DateRangeSelector;