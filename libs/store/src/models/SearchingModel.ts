import { types } from 'mobx-state-tree';

const withSearching = <TFieldNames extends Array<string>>(fieldNames: TFieldNames) =>
  types.model({
    searchValue: types.optional(types.string, ''),
    searchField: types.optional(types.string, ''),
    searchableFields: types.optional(types.enumeration(fieldNames), ''),
  });

export default withSearching;
