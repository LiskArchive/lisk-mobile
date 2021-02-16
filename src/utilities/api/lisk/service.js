import config from '../../../../lsk.config';

// eslint-disable-next-line import/prefer-default-export
export const getPriceTicker = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${config.serviceURL}/api/v1/market/prices`,
        config.requestOptions
      );
      const json = await response.json();

      if (response.ok) {
        const result = json.data.reduce((acc, item) => {
          if (item.from === 'LSK') {
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
