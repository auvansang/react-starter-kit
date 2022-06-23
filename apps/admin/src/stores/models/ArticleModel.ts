import { IAnyModelType, TrackingModel, types } from '@sa/store';
import CategoryModel from '../category/CategoryModel';
import TagModel from './TagModel';

const ArticleModel = types
  .compose(
    'Article Model',
    TrackingModel,
    types.model('Article Model Base', {
      id: types.identifier,
      categoryId: types.string,
      title: types.string,
      description: types.maybeNull(types.string),
      slug: types.string,
      content: types.string,
      published: types.boolean,
      category: types.reference(CategoryModel),
      tags: types.array(types.late((): IAnyModelType => TagModel)),
    })
  )
  .views((self) => ({
    get draft() {
      return !self.published;
    },
  }));

export default ArticleModel;
