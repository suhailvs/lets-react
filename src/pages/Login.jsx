import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { AuthContext } from '../utils/AuthContext';
import { useContext } from 'react';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post('/login/', { username:email, password });
      login(JSON.stringify(response.data))
      // localStorage.setItem('user', JSON.stringify(response.data));
      API.defaults.headers.common['Authorization'] = `Token ${response.data['key']}`;
      navigate('/dashboard');
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

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
              <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Username" />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </div>
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
}