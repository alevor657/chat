import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import invariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {Provider} from 'react-redux';
// import persistState from 'redux-localstorage';

import App from './app';

const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';

const reducer = compose(mergePersistedState())(rootReducer);

const storage = compose(filter('user'))(adapter(window.localStorage));

const enhancer = compose(
    applyMiddleware(thunk, invariant()),
    persistState(storage, 'my-storage-key')
);

const store = createStore(
    reducer,
    enhancer
);

// const store = createStore(
//     rootReducer,
//     {},
//     compose(
// persistState(storage, 'chat-storage'),
// devtools
//     )
// );

// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     applyMiddleware(invariant(), thunk),
// );

render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
