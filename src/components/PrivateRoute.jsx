import { Navigate } from 'react-router-dom';
// import { getUser } from '../utils/auth';

const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const PrivateRoute = ({ children }) => {
  return getUser() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;