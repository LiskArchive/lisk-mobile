export const networks = {
  mainNet: { // network name translation t('Mainnet');
    name: 'Mainnet',
    ssl: true,
    port: 443,
    code: 0,
  },
  testNet: {
    name: 'Testnet',
    testnet: true,
    ssl: true,
    port: 443,
    code: 1,
  },
  customNode: {
    name: 'Custom Node',
    custom: true,
    address: 'http://localhost:4000',
    code: 2,
  },
};

export const mainNetNodes = [
  'hub21.lisk.io',
  'hub22.lisk.io',
  'hub23.lisk.io',
  'hub24.lisk.io',
  'hub25.lisk.io',
  'hub26.lisk.io',
  'hub27.lisk.io',
  'hub28.lisk.io',
  'hub31.lisk.io',
  'hub32.lisk.io',
  'hub33.lisk.io',
  'hub34.lisk.io',
  'hub35.lisk.io',
  'hub36.lisk.io',
  'hub37.lisk.io',
  'hub38.lisk.io',
];

export const netHash = {
  testNet: 'da3ed6a45429278bac2666961289ca17ad86595d33b31037615d4b8e8f158bba',
  mainNet: 'ed14889723f24ecc54871d058d98ce91ff2f973192075c0155ba2b7b70ad2511',
};

export const getMainNetNode = () => {
  return mainNetNodes[Math.floor(Math.random() * mainNetNodes.length) % mainNetNodes.length];
};

export const getNetwork = (code) => {
  let network;
  Object.keys(networks).forEach((key) => {
    if (networks[key].code === code) {
      network = networks[key];
    }
  }, this);
  return network;
};
