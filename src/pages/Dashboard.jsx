// import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const API = axios.create({
    baseURL: 'https://suhailvs.pythonanywhere.com/api/v1', // replace with your backend URL
  });
  const handleLogout = () => {    
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))['key'];
        console.log(token)
        API.defaults.headers.common['Authorization'] = `Token ${token}`;
        const response = await API.get(`/users/`);
        setUsers(response.data);
    } catch (err) {
      if (err.response) {
        // Server responded with a status outside 2xx
        console.log(err.response.data || 'Login failed. Please try again.');
      } else if (err.request) {
        // Request made, but no response received
        alert('No response from server. Check your network.');
      } else {
        // Something else went wrong
        alert('An unexpected error occurred.');
      }
    } finally {
        // setLoading(false);
    }
  };
  const listItems = users.map((user) => 
    <div className="col-6 col-md-3 mb-4" key={user.id}>
      <div className="media">
        <a href="#">
          <img className="mr-3" src={user.thumbnail} alt="" />
        </a>
        <div className="media-body">
          <a href="#">{user.username}</a><br/>
          Balance: <strong>{user.balance}</strong><br/>
          {user.first_name}
        </div>
      </div>
    </div>
  );
  return (
    <>
    <h2>Welcome to the Dashboard!</h2>
    <button onClick={handleLogout}>Logout</button>
      <div className="row">{listItems}</div>
    </>
  );
}
