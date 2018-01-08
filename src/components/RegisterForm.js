import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Form,
    Grid,
    Header,
    // Image,
    Message,
    Segment
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import * as userActions from '../actions/userActions';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();

        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getInitialState() {
        return {
            email: '',
            username: '',
            password: ''
        }
    }

    handleChange(e, { name, value }) {
        this.setState({
            [name]: value
        });
    }

    async handleRegisterClick() {
        this.setState(this.getInitialState);


    }

    render() {
        let { email, username, password } = this.state;

        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{
                    height: '100%'
                }} verticalAlign='middle'>
                    <Grid.Column style={{
                        maxWidth: 450
                    }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Sign-up
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail' onChange={this.handleChange} required value={email} name="email"/>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={this.handleChange} required value={username} name="username"/>
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange} required value={password} name="password"/>

                                <Button color='teal' fluid size='large' onClick={this.handleRegisterClick}>Sign-up!</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Or{' '}
                            <Link to="/login">Log-in</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

RegisterForm.propTypes = {
    actions: PropTypes.object,
    user: PropTypes.object,
    history: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        user: state.user
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
