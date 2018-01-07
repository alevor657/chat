import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import invariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

import App from './app';


const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(invariant(), thunk),
);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
