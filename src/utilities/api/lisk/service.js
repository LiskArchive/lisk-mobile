import config from '../../../../lsk.config';

// eslint-disable-next-line import/prefer-default-export
export const getPriceTicker = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${config.serviceURL}/api/getPriceTicker`,
        config.requestOptions
      );
      const json = await response.json();

      if (response.ok) {
        const {
          tickers: { LSK },
        } = json;

        resolve({
          EUR: String(LSK.EUR),
          USD: String(LSK.USD),
        });
      } else {
        reject(json);
      }
    } catch (error) {
      reject(error);
    }
  });
