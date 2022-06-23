import saveAs from 'file-saver';

const fileNameRegex = /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/gi;

const applyTransformResponseInterceptor = (instance: HttpInstance) => {
  return instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx (status >= 200 && status < 300) cause this function to trigger
      // Do something with response data
      const responseContent: HttpResponse<any> = {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        ok: true,
      };

      if (response.config.responseType === 'blob') {
        const fileName =
          fileNameRegex.exec(
            response.headers['Content-Disposition'] || response.headers['content-disposition']
          )?.[1] ?? 'untitled';

        const blob = new Blob([response.data], {
          type: response.headers['Content-Type'] || response.headers['content-type'],
        });

        saveAs(blob, fileName);

        return responseContent;
      }

      const paginationInfo =
        response.headers['X-Pagination'] || response.headers['x-pagination'] || '';

      if (!!paginationInfo) {
        const responseContentWithMetadata: HttpResponseWithMetadata<
          any,
          { pagination: Pagination }
        > = {
          ...responseContent,
          metadata: {
            pagination: JSON.parse(paginationInfo),
          },
        };

        return responseContentWithMetadata;
      }

      return responseContent;
    },

    (error) => Promise.reject(error)
  );
};

export default applyTransformResponseInterceptor;
