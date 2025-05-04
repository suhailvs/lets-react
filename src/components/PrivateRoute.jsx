import { Navigate, Outlet } from 'react-router-dom';
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
const PrivateRoute = () => {
  const user = getUser();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
