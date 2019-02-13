import liskService from '../utilities/api/lisk/service';
import actionTypes from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export const pricesRetrieved = () => dispatch =>
  liskService.getPriceTicker()
    .then(res => dispatch({
      type: actionTypes.pricesRetrieved,
      priceTicker: res.tickers.LSK,
    }))
    .catch(console.log); // eslint-disable-line
