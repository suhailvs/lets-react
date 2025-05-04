import axios from 'axios';

const API = axios.create({
  baseURL: 'https://suhailvs.pythonanywhere.com/api/v1', // replace with your backend URL
});

export const loginUser = async (email, password) => {
  const response = await API.post('/login/', { username:email, password });
  return response.data;
};