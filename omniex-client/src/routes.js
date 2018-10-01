import React from 'react';
import Home from './components/home';
import Coin from './components/coin';
import Favorites from './components/favorites';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/favorites" component={Favorites}/>
      <Route exact path="/coin/:coin" component={Coin}/>
    </div>
  </Router>
);

export default Routes;