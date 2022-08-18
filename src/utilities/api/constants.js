import axiosClient from './axiosClient';

export const METHOD = 'rest';

export const LIMIT = 20;

export const API_VERSION = 'v3';

export const API_BASE_URL = 'http://104.248.241.229:9901';

export const API_METHOD = { rest: ({ path, method = 'get', ...config }) => axiosClient[method](path, config) };
