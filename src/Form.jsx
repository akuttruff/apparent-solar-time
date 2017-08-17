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
        event.preventDefault();
        this.setState({address: this.state.address});
        this.props.fetchLocation(this.state.address);
    }

    handleChange(event) {
        this.setState({address: event.target.value});
    }

    render() {
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
                </form>
                <h1>  </h1>
            </div>
        )
    }
}

export default Form;
