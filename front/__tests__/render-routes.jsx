import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export function RenderRoutes({ elements }) {
  const elemets = createMemoryRouter(elements);

  return <RouterProvider router={elemets} />;
}
RenderRoutes.propTypes = {
  elements: PropTypes.array.isRequired,
};
