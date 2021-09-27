import config from '../../../../btc.config';
import liskConfig from '../../../../lsk.config';

export const getPriceTicker = async () => {
  const response = await fetch(
    `${config.isTestnet ? liskConfig.testnetURL : liskConfig.serviceURL}/v2/market/prices`,
    config.requestOptions
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json);
  }

  const result = json.data.reduce((acc, item) => {
    if (item.from === 'BTC') {
      acc[item.to] = item.rate;
    }

    return acc;
  }, {});
  return result;
};

export const getDynamicFees = () =>
// eslint-disable-next-line no-async-promise-executor
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
