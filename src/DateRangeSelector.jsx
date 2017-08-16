import React, { Component } from 'react';
import { DateRange } from 'react-date-range';

class DateRangeSelector extends Component {
    handleSelect(range){
        console.log(range);
        // An object with two keys,
        // 'startDate' and 'endDate' which are Momentjs objects.
    }

    render(){
        return (
            <div>
                <DateRange
                    onInit={this.handleSelect}
                    onChange={this.handleSelect}
                    calendars={1}
                />
            </div>
        )
    }
}

export default DateRangeSelector;