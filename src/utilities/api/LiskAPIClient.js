import { APIClient } from './APIClient';
import { API_BASE_URL, WS_BASE_URL } from './constants';

const liskAPIClient = new APIClient();

liskAPIClient.create({
  http: API_BASE_URL,
  ws: `${WS_BASE_URL}/blockchain`,
});

export default liskAPIClient;
