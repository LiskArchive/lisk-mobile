import axios from 'axios';

const axiosClient = axios.create(); // todo axios instance need to be singleton

axiosClient.interceptors.response.use((res) => res.data);

export default axiosClient;
