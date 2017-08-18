import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme';
import { Table, HeaderRow } from '../src/Table.jsx';

describe('<Table />', () => {
    const solarData = [
        {
            data: {
                results: {
                    date: '2017-08-18',
                    sunrise: '6:16:35 AM',
                    sunset: '8:11:59 PM',
                    solar_noon: '1:16:59 PM',
                    day_length: '14:41:51',
                    nautical_twilight_end: '9:54 PM'
                }
            }
        },
        {
            data: {
                results: {
                    date: '2017-08-19',
                    sunrise: '6:16:35 AM',
                    sunset: '8:11:59 PM',
                    solar_noon: '1:16:59 PM',
                    day_length: '14:41:51',
                    nautical_twilight_end: '9:54 PM'
                }
            }
        },
        {
            data: {
                results: {
                    date: '2017-08-20',
                    sunrise: '6:16:35 AM',
                    sunset: '8:11:59 PM',
                    solar_noon: '1:16:59 PM',
                    day_length: '14:41:51',
                    nautical_twilight_end: '9:54 PM'
                }
            }
        }
    ];

    beforeEach(() => {
        jasmineEnzyme();
    });

    it('has a header row', () => {
        const wrapper = shallow(<Table solarData={solarData}/>);
        const headerRow = wrapper.find(HeaderRow);
        expect(headerRow.length).toBe(1);
        console.log(wrapper.debug())
    });
});