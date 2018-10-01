import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoins, fetchCurrentUser } from './actions';
import Routes from './routes';

class App extends Component {

  componentDidMount() {
    this.props.fetchCurrentUser();
    this.props.fetchCoins();
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
 fetchCoins: () => dispatch(fetchCoins()),
 fetchCurrentUser: () => dispatch(fetchCurrentUser())
});

export default connect(null, mapDispatchToProps)(App);
