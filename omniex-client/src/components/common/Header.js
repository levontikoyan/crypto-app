import React, { Component} from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import connect from "react-redux/es/connect/connect";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { user } = this.props;
    const open = Boolean(anchorEl);

    return (
      <AppBar
        position="static"
      >
        <Toolbar>
          <div className="container">
            <Link to='/'>
              <img className='logo' src='/images/logo.svg' alt="logo"/>
            </Link>
            {user ? (
              <div>
                <div className='avatar-wrapper' onClick={this.handleMenu}>
                <div className='name'>{user.name}</div>
                <Avatar className='avatar' src={user.avatar}></Avatar>
              </div>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem>
                    <Link to='/favorites'>Favorites</Link>
                  </MenuItem>
                  <MenuItem>
                    <a href="/api/logout">Logout</a>
                  </MenuItem>
                </Menu>
              </div>
            ) : user === false ? <a href="/api/auth/google">Login</a> : 'Loading'}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));