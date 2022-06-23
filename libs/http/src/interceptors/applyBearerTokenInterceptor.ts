const applyBearerTokenInterceptor = (
  instance: HttpInstance,
  getTokenAsync: () => Promise<string | null>
) => {
  instance.interceptors.request.use(
    (config) =>
      getTokenAsync()
        .then((token) => {
          if (token) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${token}`,
            };

            return config;
          }

          return Promise.reject(new Error('No token'));
        })
        .catch((error) => Promise.reject(error)),

    (error) => Promise.reject(error)
  );
};

export default applyBearerTokenInterceptor;
