import React, { Component } from 'react';
import $ from 'jquery';
import { apiKey } from '../config.js';

class Table extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     // this.state = {
    //     //     solarData: []
    //     // }
    // }



    render() {
        const { solarData } = this.props;


        return (
            <table>
                {/*{ this.getHeaderRow() }*/}
            </table>
        )
    }
}


export default Table;