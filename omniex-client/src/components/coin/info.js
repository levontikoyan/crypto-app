import React, { Component } from 'react';
import { connect } from 'react-redux';
import './info.scss';
import Favorite from '../common/Favorite';
import Loader from '../common/Loader';
import { updateFavorites } from "../../actions";

class Info extends Component {

  render() {
    const { user, coins, slug } = this.props;
    const infoData = (coins.data || []).find((v) => v.website_slug === slug);
    const isFavorite = ((user && user.favorites) || []).find((v) => v === slug);

    return (
      <div className="info">
        <Loader loading={this.props.coins.loading}>
          <div className="info-wrapper">
            <div className="logo-wrapper">
              <img src={`${(infoData && infoData.id) ?
                `https://s2.coinmarketcap.com/static/img/coins/128x128/${infoData.id}.png` :
                'https://omniex.io/wp-content/themes/omniex/dist/images/logo-o.svg'
              }`} alt="logo"/>
              <span className="price">${infoData && infoData.quotes.USD.price.toLocaleString()} USD</span>
              <span className={`${Math.sign(infoData && infoData.quotes.USD.percent_change_24h) >= 1 ? 'green' : 'red'} percentage-change`}>
                {infoData && infoData.quotes.USD.percent_change_24h}%
              </span>
            </div>
            <div className="information">
                <div className='info-section'>
                  <h1>{infoData && infoData.name}</h1>
                  <div><span>Rank:</span> #{infoData && infoData.rank}</div>
                  <div><span>Symbol: </span> {infoData && infoData.symbol}</div>
                  <div><span>Market Cap: </span> ${infoData && infoData.quotes.USD.market_cap.toLocaleString()} USD</div>
                  <div><span>Circulating Supply:</span> ${infoData && infoData.circulating_supply.toLocaleString()} {infoData && infoData.symbol}</div>
                  <div><span>Volume (24h):</span> ${infoData && infoData.quotes.USD.volume_24h.toLocaleString()} USD</div>
                </div>
                <Favorite
                  slug={slug}
                  checked={isFavorite}
                />
              </div>
          </div>
        </Loader>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  coins: state.coins,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
 updateFavorites: (data) => dispatch(updateFavorites(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);