import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../Layout';
import Charts from './charts';
import Tabs from './tabs';
import Info from './info';

class Coin extends Component {

  render() {
    const slug = this.props.match.params.coin;

    return (
      <Layout>
        <div className="coin">
          <div className="container">
            <Tabs
              tabs={[
                <Info slug={slug} />,
                <Charts slug={slug} />
              ]}
            />
          </div>
        </div>
      </Layout>
    );
  }

}

const mapStateToProps = (state) => ({
  coins: state.coins.data
});

export default connect(mapStateToProps)(Coin);
