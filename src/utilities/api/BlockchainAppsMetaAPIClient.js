import { APIClient } from './APIClient';
import {
  API_BLOCKCHAIN_APPS_META_BASE_URL,
  API_BLOCKCHAIN_APPS_META_WS_BASE_URL,
} from './constants';

const blockchainAppsMetaAPIClient = new APIClient();

blockchainAppsMetaAPIClient.create({
  http: API_BLOCKCHAIN_APPS_META_BASE_URL,
  ws: API_BLOCKCHAIN_APPS_META_WS_BASE_URL,
});

export default blockchainAppsMetaAPIClient;
