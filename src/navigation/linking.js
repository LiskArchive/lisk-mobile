const navigationLinkingConfig = {
  screens: {
    Send: 'wallet',
    NotFound: '*',
  },
};

const navigationLinking = {
  prefixes: ['https://lisk.com'],
  config: navigationLinkingConfig,
};

export default navigationLinking;
