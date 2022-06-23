import axios from 'axios';
import qs from 'qs';

const createHttpInstance = (baseUrl: string, timeout?: number) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: timeout ?? 5000,
    headers: {
      'Content-Type': 'application/json',
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    },
  });
};

export default createHttpInstance;
