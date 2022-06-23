import { IAnyModelType, types, SnapshotOut } from 'mobx-state-tree';

export const PaginationModel = types
  .model('Pagination Model', {
    pageNumber: types.number,
    pageSize: types.number,
    totalItems: types.number,
  })
  .views((self) => ({
    get totalPages() {
      return Math.ceil(self.totalItems / self.pageSize);
    },
    get hasNextPage() {
      return self.pageNumber < this.totalPages;
    },
    get hasPreviousPage() {
      return self.pageNumber > 1;
    },
  }));

export const PaginationParamsModel = types.model('Pagination Params Model', {
  pageNumber: types.number,
  pageSize: types.number,
});

const DefaultPagination: SnapshotOut<typeof PaginationModel> = {
  pageNumber: 1,
  pageSize: 10,
  totalItems: 0,
};

const DefaultPaginationParams: SnapshotOut<typeof PaginationParamsModel> = {
  pageNumber: 1,
  pageSize: 10,
};

const withPagination = <ItemModel extends IAnyModelType>(itemModel: ItemModel) =>
  types.model({
    items: types.array(itemModel),
    pagination: types.optional(PaginationModel, DefaultPagination),
    paginationParams: types.optional(PaginationParamsModel, DefaultPaginationParams),
  });

export default withPagination;
