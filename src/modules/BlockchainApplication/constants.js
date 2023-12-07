import { NETWORK } from 'utilities/api/constants';

export const APPLICATIONS_STORAGE_KEY = `@blockchainApplications-${NETWORK}`;

export const PINNED_APPLICATIONS_STORAGE_KEY = '@blockchainPinnedApplications';

export const APPLICATION_STATUSES = {
  active: 'active',
  registered: 'registered',
  terminated: 'terminated',
  unregistered: 'unregistered',
};
