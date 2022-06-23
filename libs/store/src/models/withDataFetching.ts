import { flow, getEnv, IAnyModelType, SnapshotIn, types } from 'mobx-state-tree';
import withPagination from './PaginationModel';
import withSearching from './SearchingModel';
import withSorting from './SortingModel';

const withDataFetching = <TITemModel extends IAnyModelType>(
  itemModel: TITemModel,
  name: string,
  requestPath: string
) =>
  types
    .compose(
      name,
      withPagination(itemModel),
      withSearching(['']),
      withSorting(),
      types.model('Data Item Model', {
        items: types.array(itemModel),
      })
    )
    .views((self) => ({
      get queryParams() {
        const searchParams = !!self.searchValue
          ? {
              searchField: self.searchField,
              searchValue: self.searchValue,
            }
          : null;

        return {
          ...self.paginationParams,
          searchParams,
          sortParams: self.sortFields,
        };
      },
    }))
    .actions((self) => {
      const getAsync = flow(function* () {
        const { http } = getEnv(self);
        const { data, metadata } = yield http.get(requestPath, self.queryParams);

        self.items = data;

        if (metadata && metadata.pagination) {
          self.pagination = metadata.pagination;
        }
      });

      const findAsync = flow(function* (id: string | number) {
        const { http } = getEnv(self);
        const { data } = yield http.get(`${requestPath}/${id}`);

        return data;
      });

      const createAsync = flow(function* (item: SnapshotIn<typeof itemModel>) {
        const { http } = getEnv(self);
        yield http.post(requestPath, item);
      });

      const updateAsync = flow(function* (
        id: string | number,
        data: Partial<SnapshotIn<typeof itemModel>>
      ) {
        const { http } = getEnv(self);
        yield http.put(`${requestPath}/${id}`, data);
      });

      const deleteAsync = flow(function* (id: string | number) {
        const { http } = getEnv(self);
        yield http.delete(`${requestPath}/${id}`);
      });

      return {
        getAsync,
        findAsync,
        createAsync,
        updateAsync,
        deleteAsync,
      };
    });

export default withDataFetching;
