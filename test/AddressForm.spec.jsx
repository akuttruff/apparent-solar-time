import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme'
import { shallow } from 'enzyme';
import AddressForm from '../src/AddressForm.jsx';

describe('An address form', () => {
    const address = '2206 N Skidmore Ct, Portland, OR 97217';
    const handleChange = () => {};

    beforeEach(() => {
        jasmineEnzyme();
    });

    it('shows a text input', () => {
        const wrapper = shallow(<AddressForm address={address}
                                             handleChange={handleChange}/>);
        const input = wrapper.find('input');
        expect(input.length).toBe(1);
    });

    it('takes an address string as input', () => {
        const wrapper = shallow(<AddressForm address={address}
                                           handleChange={handleChange}/>);
        const inputValue = wrapper.find('input').props().value;
        expect(inputValue).toBe('2206 N Skidmore Ct, Portland, OR 97217')
    });

    it('fires an onChange event as the user enters input', () => {
        const handleChangeSpy = jasmine.createSpy('handleChange');
        const wrapper = shallow(<AddressForm address={address}
                                             handleChange={handleChangeSpy}/>);
        wrapper.find('input').simulate('change');
        expect(handleChangeSpy).toHaveBeenCalled();
    })
});