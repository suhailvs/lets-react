import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  return getUser() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;