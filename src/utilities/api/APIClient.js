import io from 'socket.io-client';
import axios from 'axios';

export class APIClient {
  http = null;

  ws = null;

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
    return this.http?.request({ ...this.http.defaults, ...config });
  }

  create({ http, ws }) {
    this.ws = io(ws, { transports: ['websocket'] });

    const request = axios.create({
      ...this.axiosConfig,
      baseURL: http,
    });

    request.interceptors.response.use((res) => res.data);

    this.http = request;
  }
}

export default new APIClient();
