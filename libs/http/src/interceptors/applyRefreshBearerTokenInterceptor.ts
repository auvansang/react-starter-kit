import axios, { AxiosError } from 'axios';

const applyRefreshBearerTokenInterceptor = (
  instance: HttpInstance,
  getTokenAsync: () => Promise<string | null>,
  errorCallback?: () => Promise<void>
) => {
  const interceptorId = instance.interceptors.response.use(
    (response) => response,

    (error: AxiosError) => {
      if (error.response?.status != 401) {
        return Promise.reject(error);
      }

      axios.interceptors.response.eject(interceptorId);

      return getTokenAsync()
        .then((token) => {
          error.config.headers = {
            ...error.config.headers,
            Authorization: `Bearer ${token}`,
          };

          return instance(error.config);
        })
        .catch((getTokenError) => {
          if (errorCallback) {
            Promise.resolve(errorCallback());
          }

          return Promise.reject(getTokenError);
        })
        .finally(() => applyRefreshBearerTokenInterceptor(instance, getTokenAsync, errorCallback));
    }
  );
};

export default applyRefreshBearerTokenInterceptor;
