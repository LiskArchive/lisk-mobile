/* eslint-disable max-statements */
import { fetch } from 'react-native-ssl-pinning';
import { removeUndefinedObjectKeys } from '../helpers';

import { METHOD } from './constants';

export class APIClient {
  http = null;
  enableCertPinning = false;
  baseUrl = '';
  host = null;
  fetchConfig = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'lisk-mobile/3.0.0',
    },
    timeoutInterval: 10000,
  };

  create({ http, enableCertPinning = false } = {}) {
    let url = http;
    this.host = url;
    this.baseUrl = url;
    this.enableCertPinning = enableCertPinning;
  }

  async call({ transformResult = async (data) => data, ...args }) {
    return this[METHOD](args).then(transformResult);
  }

  async rest(config) {
    const { url, params = {}, method, data, headers, ...otherConfig } = config;

    // Constructing the URL with parameters
    let finalUrl = this.baseUrl + url;

    const sanitizedParams = removeUndefinedObjectKeys(params);

    if (sanitizedParams && Object.keys(sanitizedParams).length) {
      const queryString = new URLSearchParams(sanitizedParams).toString();
      finalUrl = `${finalUrl}?${queryString}`;
    }

    // Setting up request headers
    const finalHeaders = {
      ...this.fetchConfig.headers,
      ...headers,
    };

    // Request configuration for pinned fetch
    const fetchOptions = {
      ...this.fetchConfig,
      ...otherConfig,
      method: method || 'GET',
      headers: finalHeaders,
    };

    if (this.enableCertPinning && process.env.NETWORK !== 'devnet') {
      fetchOptions.sslPinning = {
        certs: ['server-cert'],
      };
    } else {
      fetchOptions.disableAllSecurity = true;
    }

    // Adding the request body
    if (['POST', 'PUT', 'PATCH'].includes(method?.toUpperCase()) && data) {
      fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(finalUrl, fetchOptions);

    const responseData = await response.json();

    if (response.status !== 200) {
      throw new Error(responseData.message || 'Request failed');
    }

    return responseData;
  }
}

export default new APIClient();
