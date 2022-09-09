import io from 'socket.io-client'
import axios from 'axios'

export class APIClient {
  socket = null

  axiosConfig = {
    timeout: 10000,
  }

  http = null

  create({ ws, http }) {
    this.socket = io(ws, { transports: ['websocket'] })
    const request = axios.create({
      ...this.axiosConfig,
      baseURL: http,
    })

    request.interceptors.response.use((res) => res.data)

    this.http = request
  }
}

export default new APIClient()
