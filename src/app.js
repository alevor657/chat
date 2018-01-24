
// Styles
import 'normalize.css';
import 'toastr/build/toastr.min.css';
import 'semantic-ui-css/semantic.min.css';
import './scss/main.scss';

import 'babel-polyfill';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Chat from './components/Chat';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/register" component={RegisterForm}/>
                    {this.props.user.token && <Route exact path="/" component={Chat}/>}
                    <Redirect to='/login'/>

                    {/* <Route path="/" component={Chat}/> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

App.propTypes = {
    user: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        user: state.user
    };
}

export default connect(mapStateToProps)(App);
