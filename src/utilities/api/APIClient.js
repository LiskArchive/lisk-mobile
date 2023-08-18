/* eslint-disable max-statements */
import { fetch } from 'react-native-ssl-pinning';
import { io } from 'socket.io-client';

import { METHOD } from './constants';

export class APIClient {
  http = null;
  ws = null;
  enableCertPinning = false;
  baseUrl = '';
  fetchConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeoutInterval: 10000,
  };

  create({ http, ws, enableCertPinning = false } = {}) {
    this.ws = io(`${ws}/blockchain`);
    this.baseUrl = http;
    this.enableCertPinning = enableCertPinning;
  }

  async call({ transformResult = async (data) => data, ...args }) {
    return this[METHOD](args).then(transformResult);
  }

  async rest(config) {
    const { url, params, method, data, headers, ...otherConfig } = config;

    // Constructing the URL with parameters
    let finalUrl = this.baseUrl + url;

    if (params && Object.keys(params).length) {
      const queryString = new URLSearchParams(params).toString();
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

  rpc({ event, params, data }) {
    return new Promise((resolve, reject) => {
      if (this.ws.disconnected) {
        reject(new Error('socket not connected'));
        return;
      }

      this.ws.emit('request', { method: event, params: params || data || {} }, (response) => {
        if (Object.keys(response).length && response.error) {
          return reject(response);
        }

        return resolve(response);
      });
    });
  }
}

export default new APIClient();
