import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import { createStore, applyMiddleware, compose } from 'redux';
import invariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default function getStore() {
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

    return store;
}
