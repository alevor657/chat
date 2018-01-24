import 'raf/polyfill';
import React from 'react';
import { LoginForm } from '../src/components/LoginForm';
import Enzyme, { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

test('Login form renders', () => {
    let wrapper = shallow(<LoginForm/>);

    expect(wrapper).toHaveLength(1);
});
