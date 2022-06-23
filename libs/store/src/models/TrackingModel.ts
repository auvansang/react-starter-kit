import { types } from 'mobx-state-tree';
import { DateTime } from 'types';

const TrackingModel = types.model('Tracking Model', {
  createdAt: DateTime,
  createdBy: types.string,
  updatedAt: types.maybeNull(DateTime),
  updatedBy: types.maybeNull(types.string),
  deletedAt: types.maybeNull(DateTime),
  deletedBy: types.maybeNull(types.string),
});

export default TrackingModel;
