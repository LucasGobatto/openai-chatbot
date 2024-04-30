import { useJobVacancyDescription } from '../hooks';
import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';

export function RouteGuard(props) {
  const { details } = useJobVacancyDescription();

  return details ? <>{props.children}</> : <Navigate to='/' replace />;
}

RouteGuard.propTypes = {
  children: PropTypes.any.isRequired,
};
