// import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {    
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <h2>Welcome to the Dashboard!</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
