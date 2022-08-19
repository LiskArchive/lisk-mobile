import apiClient from './APIClient';
import rpc from './rpc';

export const API_BASE_URL = 'http://104.248.241.229:9901';

export const METHOD = 'rest';

export const LIMIT = 20;

export const API_VERSION = 'v3';

export const API_METHOD = {
  rpc,
  rest: (config) => apiClient.http?.request({ ...apiClient.http.defaults, ...config }),
};
