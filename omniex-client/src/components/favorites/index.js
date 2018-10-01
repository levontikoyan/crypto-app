import React, { Component } from 'react';
import './index.scss';
import Layout from '../Layout';
import CoinTable from '../common/CoinTable';
import requireAuth from '../common/hoc/requireAuth';


class Favorites extends Component {

  render() {
    return (
      <Layout>
        <div className="favorites">
          <div className="container">
            <h1>Favorites</h1>
          </div>
          <div className="container">
            <CoinTable isFavoritesTable={true} />
          </div>
        </div>
      </Layout>
    );
  }

}

export default requireAuth(Favorites);
