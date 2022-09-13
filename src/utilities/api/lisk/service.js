import config from '../../../../lsk.config';

// eslint-disable-next-line import/prefer-default-export
export const getPriceTicker = async () => {
  const response = await fetch(
    `${config.isTestnet ? config.testnetURL : config.serviceURL}/v2/market/prices`,
    config.requestOptions
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json);
  }
  const result = json.data.reduce((acc, item) => {
    if (item.from === 'LSK') {
      acc[item.to] = item.rate;
    }

    return acc;
  }, {});
  return result;
};

export const getDynamicFees = async () => {
  const response = await fetch(
    `${config.isTestnet ? config.testnetURL : config.serviceURL}/v2/fees`,
    config.requestOptions
  );
  const json = await response.json();
  if (!response.ok) {
    throw new Error('Fail to request fees');
  }
  const {
    data: { feeEstimatePerByte },
  } = json;
  return {
    Low: feeEstimatePerByte.low,
    Medium: feeEstimatePerByte.medium,
    High: feeEstimatePerByte.high,
  };
};
