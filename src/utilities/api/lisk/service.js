const liskServiceUrl = 'https://service.lisk.io';

export default {
  getPriceTicker: () => new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${liskServiceUrl}/api/getPriceTicker`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        return reject(json);
      }

      return resolve(json);
    } catch (error) {
      return reject(error);
    }
  }),
};
