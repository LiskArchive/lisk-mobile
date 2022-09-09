export const networks = {
  mainNet: {
    // network name translation t('Mainnet');
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
}

export const mainNetNodes = [
  'hub21.lisk.com',
  'hub22.lisk.com',
  'hub23.lisk.com',
  'hub24.lisk.com',
  'hub25.lisk.com',
  'hub26.lisk.com',
  'hub27.lisk.com',
  'hub28.lisk.com',
  'hub31.lisk.com',
  'hub32.lisk.com',
  'hub33.lisk.com',
  'hub34.lisk.com',
  'hub35.lisk.com',
  'hub36.lisk.com',
  'hub37.lisk.com',
  'hub38.lisk.com',
]

export const netHash = {
  testNet: 'da3ed6a45429278bac2666961289ca17ad86595d33b31037615d4b8e8f158bba',
  mainNet: 'ed14889723f24ecc54871d058d98ce91ff2f973192075c0155ba2b7b70ad2511',
}

export const getMainNetNode = () =>
  mainNetNodes[Math.floor(Math.random() * mainNetNodes.length) % mainNetNodes.length]

export const getNetwork = (code) => {
  let network
  Object.keys(networks).forEach((key) => {
    if (networks[key].code === code) {
      network = networks[key]
    }
  })
  return network
}
