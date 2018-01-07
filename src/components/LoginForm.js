import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
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
import * as userActions from '../actions/userActions';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
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

    handleLoginClick() {
        this.props.actions.login(Object.assign({}, {...this.state}));
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
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={this.handleUsernameInput} required/>
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handlePasswordInput} required/>

                                <Button color='teal' fluid size='large' onClick={this.handleLoginClick}>Login</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Or{' '}
                            <a href='#'>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

LoginForm.propTypes = {
    actions: PropTypes.object
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
