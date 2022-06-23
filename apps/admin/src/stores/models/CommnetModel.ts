import { IAnyModelType, TrackingModel, types } from '@sa/store';

const CommentModel = types.compose(
  'Comment Model',
  TrackingModel,
  types.model('Comment Model Base', {
    id: types.identifier,
    parentId: types.maybeNull(types.string),
    content: types.maybeNull(types.string),
    children: types.array(types.late((): IAnyModelType => CommentModel)),
  })
);

export default CommentModel;
