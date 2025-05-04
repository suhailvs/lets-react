import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div className="container">

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <button onClick={handleLogout}>Logout</button>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;