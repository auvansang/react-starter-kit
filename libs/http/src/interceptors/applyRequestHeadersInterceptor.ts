const applyRequestHeadersInterceptor = (
  instance: HttpInstance,
  getHeadersAsync: () => Promise<{ [key: string]: string } | null>
) => {
  instance.interceptors.request.use(
    (config) =>
      getHeadersAsync()
        .then((headers) => {
          config.headers = {
            ...config.headers,
            ...headers,
          };

          return config;
        })
        .catch((error) => Promise.reject(error)),

    (error) => Promise.reject(error)
  );
};

export default applyRequestHeadersInterceptor;
