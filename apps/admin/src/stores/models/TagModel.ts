import { TrackingModel, types } from '@sa/store';

const TagModel = types.compose(
  'Tag Model',
  TrackingModel,
  types.model('Tag Model Base', {
    id: types.identifier,
    name: types.string,
    description: types.maybeNull(types.string),
    slug: types.string,
  })
);

export default TagModel;
