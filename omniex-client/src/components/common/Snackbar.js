import React, { Component } from 'react';
import SnackbarMUI from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Snackbar extends Component {
  render() {
    return (
      <SnackbarMUI
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.props.open}
        autoHideDuration={4000}
        onClose={this.props.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.props.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

export default Snackbar;