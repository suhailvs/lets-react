import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../utils/api';

export default function User() {
  const params = useParams();
  const navigate = useNavigate();
  const userid = params['id'];

  const [user, setUser] = useState({});
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
  const handleSendMoney = async () => {
      setError("");  // Clear previous errors
      setLoading(true);
      try {
        const response = await API.post('/transactions/',{
          user: userid,
          amount: amount,
          message: message
        });
        navigate("/");
        // setModalVisible(false); 
        // router.replace({ pathname: 'screens/sendmoney/success',params: {name:first_name, amount:amount } });
        // setOffering(response.data);
      } catch (error) {
        if (error.response) {
          setError(JSON.stringify(error.response.data)|| "Invalid credentials");
        } else if (error.request) {
          setError("Network error. Please try again.");
        } else {
          setError("Something went wrong. Please try again.");
        }      
      } finally {
        setLoading(false);      
      }    
    };
  return (
  <div>
    {loading==true ? (<div>loading...</div>): (
    <div className="card" style={{ width: '18rem'}}>
      <img src={user.image} className="card-img-top" alt={user.first_name} />
      <div className="card-body">
        <h5 className="card-title">{user.first_name} ({user.username})</h5>
        <p className="card-text">balance: £ {user.balance ?? 0}</p>
        <input
          className="form-control mb-4"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="number"
          className="form-control form-control-lg text-center"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn btn-primary btn-lg" onClick={handleSendMoney}>Proceed</button>
      </div>
      {error}
    </div>
    
    )}      
  </div>
  )
}