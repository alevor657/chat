
// Styles
import 'normalize.css';
import 'toastr/build/toastr.min.css';
import 'semantic-ui-css/semantic.min.css';
import './scss/main.scss';

import 'babel-polyfill';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';

class App extends Component {
    constructor(props) {
        super(props);

        this.checkLogin = this.checkLogin.bind(this);
    }

    checkLogin() {
        if (!this.props.user.token) {
            console.log(!this.props.user.token, this.props.user);
            return <Redirect to="/login"/>;
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/register" component={RegisterForm}/>
                    {this.props.user.token && <Route exact path="/" component={Home}/>}
                    <Redirect to='/login'/>
                </Switch>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        user: state.user
    };
}

export default connect(mapStateToProps)(App);
