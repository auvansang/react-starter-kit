type HttpInstance = import('axios').AxiosInstance;

interface HttpResponse<TData> {
  data: TData;
  status: number;
  statusText: string;
  ok: boolean;
}

interface HttpResponseWithMetadata<TData, TMetadata> extends HttpResponse<TData> {
  metadata: TMetadata;
}

interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
