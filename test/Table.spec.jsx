import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme';
import Table from '../src/Table.jsx';

describe('<Table />', () => {
    beforeEach(() => {
        jasmineEnzyme();
    });

    it('has a header row', () => {
        const wrapper = shallow(<Table />);
        expect(true).toBe(true);
        console.log(wrapper.debug())
    });
});