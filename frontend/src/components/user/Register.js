import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './User.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const navigate = useNavigate();

  const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'localhost';
  const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
  const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'masterrecipe';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordAgain) {
      toast.error('Please make sure your passwords match.');
      return;
    }
    axios
      .post(`http://${backendHost}:${backendPort}/${backendEndpoint}/register`, {
        username: username,
        email: email,
        password: password,
        password_again: passwordAgain,
      })
      .then((response) => {
        toast.success(response.data.message);
        navigate('/login');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (error.response.data.username) {
            toast.error(`Username: ${error.response.data.username}`);
          }
          if (error.response.data.email) {
            toast.error(`Email: ${error.response.data.email}`);
          }
        } else {
          toast.error('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <>
      <h1>Register</h1>
      <div>
        <TextField className="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <br />
      <div>
        <TextField className="outlined-basic" label="E-Mail" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <br />
      <div>
        <TextField className="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <br />
      <div>
        <TextField className="outlined-basic" label="Password Again" variant="outlined" type="password" onChange={(e) => setPasswordAgain(e.target.value)} />
      </div>
      <br />
      <Button variant="contained" onClick={handleSubmit} className="register-button">
        Register
      </Button>
      <ToastContainer />
    </>
  );
}

export default Register;
