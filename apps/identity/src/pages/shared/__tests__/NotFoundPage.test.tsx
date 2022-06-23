import renderer from 'react-test-renderer';

import NotFoundPage from '../NotFoundPage';

it('It rendered successfully', () => {
  const component = renderer.create(<NotFoundPage />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
