import React, { Component } from 'react';
import _ from 'lodash';

class Table extends Component {

    getDataRows(data) {

        {/*data.map((day) => {*/}
        //
        //     const { date, sunrise, sunset } = day;
        //     console.log('date', date, 'sunrise', sunrise, 'sunset', sunset)
        //     return (
        //         <tr>
        //             <td>
        //                 { date }
        //             </td>
        //             <td>
        //                 { sunrise }
        //             </td>
        //             <td>
        //                 { sunset }
        //             </td>
        //         </tr>
        //     )
        // });
    }

    getHeaderRow() {
        return (
            <tr>
                <th>
                    Date:
                </th>
                <th>
                    Sunrise:
                </th>
                <th>
                    Sunset:
                </th>
            </tr>
        )
    }

    render() {
        const { solarData } = this.props;
        console.log('solarData', solarData)
        return (
            <table>
                { this.getHeaderRow() }
                { this.getDataRows(solarData) }
            </table>
        )
    }
}

export default Table;