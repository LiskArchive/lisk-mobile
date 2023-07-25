import axios from 'axios';
import { io } from 'socket.io-client';
import { fetch } from 'react-native-ssl-pinning';

import { METHOD } from './constants';

export class APIClient {
  http = null;

  ws = null;

  certs = null;

  axiosConfig = {
    timeout: 10000,
  };

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

  rest(config) {
    if (this.certs) {
      return fetch(this.http, {
        ...this.axiosConfig,
        ...config,
        sslPinning: {
          certs: this.certs,
        },
      });
    }
    return this.http?.request({ ...this.http.defaults, ...config });
  }

  create({ http, ws, apiCertificatePublicKey } = {}) {
    console.log({ apiCertificatePublicKey });

    this.ws = io(`${ws}/blockchain`);

    if (apiCertificatePublicKey) {
      // TODO: Import certificate and assign to this.certs
    }

    const request = axios.create({
      ...this.axiosConfig,
      baseURL: http,
    });

    request.interceptors.response.use((res) => res.data);

    this.http = request;
  }

  call({ transformResult = async (data) => data, ...args }) {
    return this[METHOD](args).then(transformResult);
  }
}

export default new APIClient();
