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
import toastr from 'toastr';

import * as userActions from '../actions/userActions';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false
        };

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
    }

    handleUsernameInput(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordInput(e) {
        this.setState({password: e.target.value});
    }

    async handleLoginClick() {
        this.setState({
            loading: true
        });

        let { username, password } = this.state;

        await this.props.actions.login(Object.assign({}, {username, password}));

        if (this.props.user.token) {
            this.props.history.push('/');
            return;
        }

        this.setState({
            username: '',
            password: '',
            loading: false
        });

        toastr.error('Bad username or password', 'Something went wrong');
    }

    render() {
        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{
                    height: '100%'
                }} verticalAlign='middle'>
                    <Grid.Column style={{
                        maxWidth: 450
                    }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Log-in to your account
                        </Header>
                        <Form size='large' loading={this.state.loading}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={this.handleUsernameInput} required value={this.state.username}/>
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handlePasswordInput} required value={this.state.password}/>

                                <Button color='teal' fluid size='large' onClick={this.handleLoginClick}>Login</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Or{' '}
                            <Link to="/register">Sign-Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

LoginForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
