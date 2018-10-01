import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const axiosInstance = axios.create({
  baseURL: '/api'
});

export default function configureStore() {
 return createStore(
  rootReducer,
   applyMiddleware(thunk.withExtraArgument(axiosInstance))
 );
}