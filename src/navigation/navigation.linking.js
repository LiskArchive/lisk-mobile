import { getPathFromState } from '@react-navigation/core';

import { getNavigationStateFromPath } from './navigation.utils';

const navigationLinkingConfig = {
  screens: {
    Send: 'wallet',
    NotFound: '*',
    Error: 'error',
  },
};

const navigationLinking = {
  prefixes: ['lisk://', 'https://lisk.com'],
  config: navigationLinkingConfig,
  getStateFromPath: getNavigationStateFromPath,
  getPathFromState,
};

export default navigationLinking;
