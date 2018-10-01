import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import './Favorite.css';
import Snackbar from "./Snackbar";
import { updateFavorites } from '../../actions';

class Favorite extends Component{
  state = {
    open: false,
    loading: false
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleCheck = () => {
    const { updateFavorites , slug, user } = this.props;
    if (user) {
      this.setState({ loading: true}, () => {
        updateFavorites(slug, () => this.setState({ open: true, loading: false }));
      });
    } else {
      window.location.replace("https://omniex-client.herokuapp.com/api/auth/google");
    }
  };

  render() {
    const { checked } = this.props;
    const { loading } = this.state;
    return (
        [
            <Snackbar
              key='snackbar'
              open={this.state.open}
              handleClose={this.handleClose}
              message={checked ? 'Added to Favorites' : 'Removed from Favorites'}
            />,
            <Tooltip key='favorite' title={`${checked ? 'Remove from Favorites' : 'Add to Favorites'}`} placement='bottom'>
              <div className='favorite'>
                <input className={`${checked ? 'checked' : ''}`} type="checkbox" id="like"/>
                <label className={`${loading ? 'loading' : ''}`} onClick={() => this.handleCheck()} htmlFor="like">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"/>
                  </svg>
                </label>
              </div>
            </Tooltip>
        ]

    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});


const mapDispatchToProps = dispatch => ({
 updateFavorites: (data, cb) => dispatch(updateFavorites(data, cb))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);