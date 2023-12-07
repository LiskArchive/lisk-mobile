import { NETWORK } from 'utilities/api/constants';

const BASE_APPLICATIONS_STORAGE_KEY = '@blockchainApplications';

export const APPLICATIONS_STORAGE_KEY =
  NETWORK === 'mainnet'
    ? BASE_APPLICATIONS_STORAGE_KEY
    : `${BASE_APPLICATIONS_STORAGE_KEY}-${NETWORK}`;

export const PINNED_APPLICATIONS_STORAGE_KEY = '@blockchainPinnedApplications';

export const APPLICATION_STATUSES = {
  active: 'active',
  registered: 'registered',
  terminated: 'terminated',
  unregistered: 'unregistered',
};
