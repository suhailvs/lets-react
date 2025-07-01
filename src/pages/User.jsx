import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import API from '../utils/api';

export default function User() {
  const params = useParams();
  const userid = params['id'];

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const response = await API.get(`/users/${userid}/`);
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
  <div>
    User: {userid}
    {loading==true ? (<div>loading...</div>): (
      <div>
        <img className="img-thumbnail mr-3" src={user.image}/>
        £ {user.balance ?? 0}
      
      </div>
    )}      
  </div>
  )
}