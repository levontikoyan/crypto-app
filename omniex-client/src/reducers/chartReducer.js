import { FETCH_COIN_CHART, FETCH_COIN_CHART_SUCCESS } from '../actions/types';

const initialState = {
  loading: false,
  data: []
};

export default (state = initialState, action) => {
 switch (action.type) {
   case FETCH_COIN_CHART:
   return {
     ...state,
     loading: true
   };
   case FETCH_COIN_CHART_SUCCESS:
   return {
     loading: false,
     data: action.payload
   };
   default:
     return state
   }
}