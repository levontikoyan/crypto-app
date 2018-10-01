import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loader.scss';

function Loader(props) {
  return (
    <div className="loader-wrapper">
      { props.loading && <div className="loader"><CircularProgress size={props.size || 70}/></div>}
      { props.children }
    </div>
  );
}

export default Loader;