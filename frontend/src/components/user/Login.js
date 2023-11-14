import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './User.css';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'localhost';
  const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
  const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'masterrecipe';

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://${backendHost}:${backendPort}/${backendEndpoint}/login`,
        {
          username: username,
          password: password,
        },
        { withCredentials: true },
      )
      .then((response) => {
        if (response.status === 200) {
          onLoginSuccess();
          toast.success('Login successful!');
          navigate('/homepage');
        } else {
          toast.error('Invalid email or password');
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log('Request failed:', error.message);
        }
      });
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <div className="form-group">
        <TextField className="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <br />
      <div className="form-group">
        <TextField className="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <br />
      <Button variant="contained" onClick={handleSubmit} className="login-button">
        Login
      </Button>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
}

export default Login;
