
// Styles
import 'normalize.css';
import 'semantic-ui-css/semantic.min.css';
import './scss/main.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Home from './components/Home';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.checkLogin = this.checkLogin.bind(this);
    }

    checkLogin() {
        if (!this.state.user) {
            console.log(!this.state.user, this.state.user);
            return <Redirect to="/login"/>;
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    {this.state.user && <Route exact path="/" component={Home}/>}
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
