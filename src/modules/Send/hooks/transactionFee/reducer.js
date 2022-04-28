/* eslint-disable import/prefer-default-export */
import { DEFAULT_MIN_REMAINING_BALANCE } from 'modules/Send/constants';
import { toRawLsk } from 'utilities/conversions';

const calculateAvailableBalance = (balance) => {
  return Math.max(balance - DEFAULT_MIN_REMAINING_BALANCE, 0);
};

const initialFee = {
  value: 0,
  error: false,
  feedback: '',
};

const getInitialState = account => ({
  fee: initialFee,
  minFee: initialFee,
  maxAmount: {
    value: account.token?.balance,
    error: false,
    feedback: '',
  },
});

const actionTypes = {
  setFee: 'SET_FEE',
  setMinFee: 'SET_MIN_FEE',
  setMaxAmount: 'SET_MAX_AMOUNT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.setFee:
      return { ...state, fee: action.payload.response };

    case actionTypes.setMinFee:
      return { ...state, minFee: action.payload.response };

    case actionTypes.setMaxAmount: {
      const balance = action.payload.account?.balance;
      const availableBalance = calculateAvailableBalance(balance);
      let maxAmount = availableBalance - toRawLsk(action.payload.response.value);
      if (maxAmount < 0) {
        maxAmount = 0;
      }
      const result = {
        ...action.response,
        maxAmount: {
          ...state.maxAmount,
          value: maxAmount
        },
      };

      return { ...state, ...result };
    }

    default:
      throw Error(`reducer not implemented for ${action}`);
  }
};

export {
  actionTypes,
  getInitialState,
  reducer,
};
