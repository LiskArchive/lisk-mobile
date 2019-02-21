// import config from '../../../../btc.config';
import liskConfig from '../../../../lsk.config';

// eslint-disable-next-line import/prefer-default-export
export const getPriceTicker = () => new Promise(async (resolve, reject) => {
  try {
    const response = await fetch(`${liskConfig.serviceURL}/api/getPriceTicker`, liskConfig.requestOptions);
    const json = await response.json();

    if (response.ok) {
      const { tickers: { BTC } } = json;

      resolve({
        EUR: String(BTC.EUR),
        USD: String(BTC.USD),
      });
    } else {
      reject(json);
    }
  } catch (error) {
    reject(error);
  }
});
