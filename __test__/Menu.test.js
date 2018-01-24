import 'raf/polyfill';
import React from 'react';
import Nav from '../src/components/Menu';
import Enzyme, { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

test('Menu form renders', () => {
    let wrapper = shallow(<Nav />);

    expect(wrapper).toHaveLength(1);
});
