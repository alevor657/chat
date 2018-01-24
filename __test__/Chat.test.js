import 'raf/polyfill';
import React from 'react';
import { Chat } from '../src/components/Chat';
import Enzyme, { shallow } from 'enzyme';
// import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

test('Chat form renders', () => {
    let user = {
            username: 'tester',
            email: 'test@test.testing'
        },
        wrapper = shallow(<Chat user={user}/>);

    expect(wrapper).toHaveLength(1);
});
