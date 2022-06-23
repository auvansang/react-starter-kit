import { types } from 'mobx-state-tree';

export const SortingModel = types.model('Sorting Model', {
  sortBy: types.optional(types.string, ''),
  sortOrder: types.optional(types.enumeration(['', 'ASC', 'DESC']), ''),
});

const withSorting = () =>
  types.model({
    sortFields: types.optional(types.array(SortingModel), []),
  });

export default withSorting;
