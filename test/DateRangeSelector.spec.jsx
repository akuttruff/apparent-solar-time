import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme';
import DateRangeSelector from '../src/DateRangeSelector.jsx';
import moment from 'moment';

describe('A date range selector', () => {
    beforeEach(() => {
        jasmineEnzyme();
    });

    it('defaults to the current date', () => {
        const today = moment('2018-08-20').toDate();
        jasmine.clock().mockDate(today);
        const wrapper = shallow(<DateRangeSelector onRangeChange={() => {}}/>);
        expect(wrapper.find('DateRange').props().startDate.valueOf()).toBe(today.valueOf());
    });

});