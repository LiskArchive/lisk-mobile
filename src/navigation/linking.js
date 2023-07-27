const navigationLinkingConfig = {
  screens: {
    Send: 'wallet',
    NotFound: '*',
  },
};

const navigationLinking = {
  prefixes: ['lisk://', 'https://lisk.com'],
  config: navigationLinkingConfig,
};

export default navigationLinking;
