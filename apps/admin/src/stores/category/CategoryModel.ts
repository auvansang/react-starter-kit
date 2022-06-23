import { IAnyModelType, TrackingModel, types } from '@sa/store';

const CategoryModel = types.compose(
  'Category Model',
  TrackingModel,
  types.model('Category Model Base', {
    id: types.identifier,
    parentId: types.maybeNull(types.string),
    name: types.string,
    description: types.maybeNull(types.string),
    slug: types.string,
    children: types.array(types.late((): IAnyModelType => CategoryModel)),
  })
);

export default CategoryModel;
