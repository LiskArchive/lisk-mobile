import apiClient from './APIClient';

/**
 * Makes RPC api call
 *
 * @param {string} event - api event end point
 * @param {string} params - HTTP call parameters
 * @param {string} data - HTTP call parameters
 * @returns {Promise} - if success it returns data,
 * if fails on server it throws an error,
 *
 */
export default function ws({
  event,
  params,
  data,
}) {
  return new Promise((resolve, reject) => {
    if (apiClient.socket.disconnected) {
      reject(new Error('socket not connected'));

      return;
    }

    apiClient.socket.emit(event, params || data || {}, (response) => {
      if (Object.keys(response).length && response.error) {
        return reject(response);
      }

      return resolve(response);
    });
  });
}
