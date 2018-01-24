import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// import persistState from 'redux-localstorage';

import App from './app';
import getStore from './createStore';

let store = getStore();

render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
