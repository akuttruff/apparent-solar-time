import React, { Component } from 'react';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {address: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState({address: this.state.address});
        alert('A name was submitted: ' + this.state.address);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({address: event.target.value});
        console.log(this.state.address);
    }

    render() {
        const { address, onUpdateAddress } = this.props;

        return (
            <div>
                <h1>Hello</h1>
                <span>{this.state.address}</span>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.address} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                    {/*<DateRangePicker />*/}
                </form>
            </div>
        )
    }
}

export default Form;
