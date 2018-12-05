import liskService from '../utilities/api/liskService';
import actionTypes from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export const getPriceTicker = () => dispatch =>
  liskService.getPriceTicker()
    .then(res => dispatch({
      type: actionTypes.priceTickerLoaded,
      priceTicker: res.tickers.LSK,
    }))
    .catch(error => dispatch({
      type: actionTypes.priceTickerFailed,
      error,
    }));
