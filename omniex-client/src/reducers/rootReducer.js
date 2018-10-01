import { combineReducers } from 'redux';
import coinsReducer from './coinsReducer';
import chartReducer from './chartReducer';
import userReducer from "./userReducer";

export default combineReducers({
  coins: coinsReducer,
  chartData: chartReducer,
  user: userReducer
});