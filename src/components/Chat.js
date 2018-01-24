import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Feed, Comment, Header, Form, TextArea} from 'semantic-ui-react';
import md5 from 'js-md5';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import * as userActions from '../actions/userActions';
import { API_URL } from '../constants';

import Menu from './Menu';

function getGravatar(email) {
    return `https://www.gravatar.com/avatar/${md5(email)}`;
}

export class Chat extends Component {
    constructor(props) {
        super(props);

        this.updateUsers = this.updateUsers.bind(this);
        this.onMessageInput = this.onMessageInput.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.renderMessage = this.renderMessage.bind(this);

        this.state = {
            message: '',
            users: [],
            messages: []
        };

        let { username, email } = this.props.user;

        this.socket = io(API_URL);
        this.socket.emit('new user', {username, email});
        this.socket.on('update usernames', this.updateUsers);
        this.socket.on('message', this.renderMessage);
    }

    onMessageInput(e) {
        this.setState({
            message: e.target.value
        });
    }

    onKeyUp(e) {
        e.preventDefault();
        e.stopPropagation();
        switch (e.which) {
            case 13:
                this.sendMessage();
                break;
            default:
                return true;
        }
    }

    renderMessage(data) {
        console.log('RENDER MESSAGE');
        console.log(data);
        let { username, email, message }= data;

        this.setState(prevState => {
            let messages = prevState.messages.slice(0);

            messages.push({
                username, email, message
            });

            return {...prevState, messages};
        });
    }

    sendMessage() {
        let { username, email } = this.props.user;

        this.socket.emit('message', {
            message: this.state.message,
            username,
            email,
            timestamp: new Date()
        });

        this.setState({ message: '' });
    }

    updateUsers(users) {
        console.log(users);
        this.setState({
            users
        });
    }

    insertWhisper(username) {
        this.setState({
            message: `/w ${username} `
        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    componentDidUpdate() {
        this.lastMsg.scrollIntoView({ behaviour: 'smooth' });
    }

    render() {
        let { users, messages } = this.state;

        return (
            <div className="chat">
                <Menu username={this.props.user.username} logout={this.props.logout}/>
                <Grid columns={2} celled='internally' className='chat-window'>
                    <Grid.Row stretched>
                        <Grid.Column width={4} textAlign='center'>
                            <Feed size="large">
                                {users.map((user, i) => {
                                    return (
                                        <Feed.Event key={i}>
                                            <Feed.Label image={getGravatar(user.email)}/>
                                            <Feed.Content content={user.username}/>
                                        </Feed.Event>
                                    );
                                })}
                            </Feed>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Comment.Group>
                                <Header as='h3' dividing>Chat</Header>

                                {messages.map((msg, i) => {
                                    return (
                                        <Comment key={i}>
                                            <Comment.Avatar src={getGravatar(msg.email)} />
                                            <Comment.Content>
                                                <Comment.Author as='a'>{msg.username}</Comment.Author>
                                                <Comment.Metadata>
                                                    <div>{moment(msg.timestamp).toNow()}</div>
                                                </Comment.Metadata>
                                                <Comment.Text>{msg.message}</Comment.Text>
                                                <Comment.Actions>
                                                    <Comment.Action onClick={() => this.insertWhisper(msg.username)}>Whisper</Comment.Action>
                                                </Comment.Actions>
                                            </Comment.Content>
                                        </Comment>
                                    );
                                })}

                                <div ref={el => this.lastMsg = el}></div>
                            </Comment.Group>
                            <Form>
                                <TextArea placeholder='Start typing a message' style={{ minHeight: 100 }}
                                    onInput={this.onMessageInput}
                                    value={this.state.message}
                                    onKeyUp={this.onKeyUp}
                                />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

Chat.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        ...ownProps
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(userActions.logout, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
