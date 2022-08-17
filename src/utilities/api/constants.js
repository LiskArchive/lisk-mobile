import axiosClient from './axiosClient';

export const METHOD = 'rest';

export const LIMIT = 20;

export const API_VERSION = 'v3';

export const API_METHOD = { rest: ({ path, method = 'get', ...config }) => axiosClient[method](path, config) };
