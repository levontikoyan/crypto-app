import { FETCH_COINS, FETCH_COINS_SUCCESS } from '../actions/types';

const initialState = {
  loading: false,
  data: []
};

export default (state = initialState, action) => {
 switch (action.type) {
   case FETCH_COINS:
   return {
     ...state,
     loading: true
   };
   case FETCH_COINS_SUCCESS:
   return {
     loading: false,
     data: action.payload
   };
   default:
     return state
   }
}