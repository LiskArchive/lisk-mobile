import { APIClient } from './APIClient';
import { API_BASE_URL, WS_BASE_URL } from './constants';

const applicationsAPIClient = new APIClient();

applicationsAPIClient.create({
  http: API_BASE_URL,
  ws: `${WS_BASE_URL}/blockchain`,
});

export default applicationsAPIClient;
