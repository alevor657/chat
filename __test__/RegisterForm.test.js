import 'raf/polyfill';
import React from 'react';
import { RegisterForm } from '../src/components/RegisterForm';
import Enzyme, { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

test('Register Form form renders', () => {
    let wrapper = shallow(<RegisterForm />);

    expect(wrapper).toHaveLength(1);
});
