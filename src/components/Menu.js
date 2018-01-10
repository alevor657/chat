import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Menu} from 'semantic-ui-react';

export default class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu">
                <Menu pointing>
                    <Menu.Item content={`Logged in as: ${this.props.username}`}/>
                    <Menu.Menu position='right'>
                        <Menu.Item name='logout' onClick={this.props.logout}/>
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

Nav.propTypes = {
    username: PropTypes.string,
    logout: PropTypes.func
};
