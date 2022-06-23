import { withDataFetching } from '@sa/store';

import CategoryModel from './CategoryModel';

const CategoryStore = withDataFetching(CategoryModel, 'Category', '/b/api/v1/categories');

export default CategoryStore;
