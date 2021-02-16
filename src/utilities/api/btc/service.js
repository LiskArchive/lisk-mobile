import config from '../../../../btc.config';
import liskConfig from '../../../../lsk.config';

export const getPriceTicker = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${liskConfig.serviceURL}/api/v1/market/prices`,
        liskConfig.requestOptions
      );
      const json = await response.json();

      if (response.ok) {
        const result = json.data.reduce((acc, item) => {
          if (item.from === 'BTC') {
            acc[item.to] = item.rate;
          }

          return acc;
        }, {});

        resolve(result);
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
