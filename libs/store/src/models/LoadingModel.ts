import { types } from 'mobx-state-tree';

const LoadingModel = types.model('Loading Model', {
  id: types.identifier,
  loading: types.boolean,
  progress: types.optional(types.number, 100),
  notes: types.optional(types.string, ''),
});

export default LoadingModel;
