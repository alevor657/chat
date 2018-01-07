import { render } from 'react-dom';

// Styles
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';
import './scss/main.scss';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const store = createStore(
    combineReducers({
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                        <Switch>

                        </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;

render(<App/>, document.getElementById('root'));
