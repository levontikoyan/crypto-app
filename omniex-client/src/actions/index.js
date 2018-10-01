import {
  FETCH_COINS,
  FETCH_COINS_SUCCESS,
  FETCH_COIN_CHART,
  FETCH_COIN_CHART_SUCCESS,
  FETCH_CURRENT_USER
} from './types';

export const fetchCoins = () => async (dispatch, getState, api ) => {
  dispatch({ type: FETCH_COINS });
  const res = await api.get('/coins');
  dispatch({ type: FETCH_COINS_SUCCESS, payload: res.data.data })
};

export const fetchCoinChartData = slug => async (dispatch, getState, api ) => {
  dispatch({ type: FETCH_COIN_CHART });
  const res = await api.get(`/chart-data?slug=${slug}`);
  dispatch({ type: FETCH_COIN_CHART_SUCCESS, payload: res.data.data })
};

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const updateFavorites = (slug, cb) => async (dispatch, getState, api) => {
  await api.post(`/favorite/${slug}`);
  await dispatch(fetchCurrentUser());
  cb()
};