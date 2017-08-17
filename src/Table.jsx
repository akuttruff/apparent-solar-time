import React, { Component } from 'react';

class Table extends Component {
    render() {
        const { location } = this.props;
        console.log('ocation', location)
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}

export default Table;