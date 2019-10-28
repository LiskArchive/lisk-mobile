import config from '../../../../btc.config';
import liskConfig from '../../../../lsk.config';

export const getPriceTicker = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${liskConfig.serviceURL}/api/getPriceTicker`,
        liskConfig.requestOptions
      );
      const json = await response.json();

      if (response.ok) {
        const {
          tickers: { BTC },
        } = json;

        resolve({
          CHF: String(BTC.CHF),
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

export const getDynamicFees = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(config.minerFeesURL);
      const json = await response.json();

      if (response.ok) {
        resolve({
          Low: json.hourFee,
          Medium: json.halfHourFee,
          High: json.fastestFee,
        });
      } else {
        reject(json);
      }
    } catch (error) {
      reject(error);
    }
  });
