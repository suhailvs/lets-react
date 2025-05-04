import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './pages/Nav';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import PrivateRoute from './components/PrivateRoute';

function App() {
  
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>          
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user/:id" element={<User />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;