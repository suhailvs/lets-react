import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import API from '../utils/api';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/users/`);
      console.log(response.data)
      setUsers(response.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data || 'Login failed. Please try again.');
      } else if (err.request) {
        alert('No response from server. Check your network.');
      } else {
        alert('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };
  const listItems = users.map((user) =>
    <div className="col-6 col-md-3 mb-4" key={user.id}>
      <div className="media">
        <a href="#">
          <img className="mr-3" src={user.thumbnail} alt="" />
        </a>
        <div className="media-body">
         <Link to={`/user/${user.id}`}>{user.username}</Link><br />
          Balance: <strong>{user.balance}</strong><br />
          {user.first_name}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <h2>Welcome to the Dashboard!</h2>
      {loading==true ? (<div>loading...</div>): (<div className="row">{listItems}</div>)}      
    </>
  );
}
