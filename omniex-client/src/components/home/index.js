import React, { Component } from 'react';
import './index.scss';
import TextField from '@material-ui/core/TextField';
import CoinTable from '../common/CoinTable';
import Layout from "../Layout";

class Home extends Component {
  state = {
    search: ''
  };

  handleChange =  event => {
    this.setState({
      search: event.target.value
    });
  };

  render() {
    return (
      <Layout>
        <div className="home">
          <div className="container text-field">
            <TextField
              className='search-input'
              label="Search"
              placeholder='Search by coin name or symbol'
              value={this.state.search}
              onChange={this.handleChange}
              margin="normal"
            />
          </div>
          <div className="container table">
            <CoinTable
              search={this.state.search}
              isFavoritesTable={false}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
