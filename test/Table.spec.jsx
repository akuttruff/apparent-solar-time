import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme';
import { Table, HeaderRow } from '../src/Table.jsx';

describe('<Table />', () => {
    const solarData = [
        {
            date: 'Aug 27, 2017',
            sunrise: '6:16:35 AM',
            sunset: '8:11:59 PM',
            solar_noon: '1:16:59 PM',
            day_length: '14:41:51',
            nautical_twilight_end: '9:54:12 PM'
        }
    ];

    beforeEach(() => {
        jasmineEnzyme();
    });

    it('is a table', () => {
        const wrapper = shallow(<Table solarData={solarData}/>);
        const tableTag = wrapper.find('table');
        expect(tableTag.length).toBe(1);
    });

    it('has a header row', () => {
        const wrapper = shallow(<Table solarData={solarData}/>);
        const headerRow = wrapper.find(HeaderRow);
        expect(headerRow.length).toBe(1);
    });

    describe('for a particular date', () => {
        it('shows the date', () => {
            const wrapper = shallow(<Table solarData={solarData}/>);
            const date = wrapper.find('tr').find('#date').text();
            expect(date).toBe('Aug 27, 2017');
        });

        it('shows the time of sunrise', () => {
            const wrapper = shallow(<Table solarData={solarData}/>);
            const sunriseTime = wrapper.find('td').find('#sunrise').text();
            expect(sunriseTime).toBe('6:16:35 AM');
        });

        it('shows the time of sunset', () => {
            const wrapper = shallow(<Table solarData={solarData}/>);
            const sunsetTime = wrapper.find('td').find('#sunset').text();
            expect(sunsetTime).toBe('8:11:59 PM');
        });

        it('shows the range for nautical afternoon', () => {
            const wrapper = shallow(<Table solarData={solarData}/>);
            const nauticalNoon = wrapper.find('td').find('#nautical-noon').text();
            expect(nauticalNoon).toBe('1:16:59 PM - 9:54:12 PM');
        })

        it('shows the day length', () => {
            const wrapper = shallow(<Table solarData={solarData}/>);
            const sunsetTime = wrapper.find('td').find('#day-length').text();
            expect(sunsetTime).toBe('14:41:51 (H:M:S)');
        });
    })
});