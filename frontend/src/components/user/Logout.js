import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function LogoutButton() {
  const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'localhost';
  const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
  const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'masterrecipe';

  const handleLogoutClick = async () => {
    try {
      const response = await axios.post(`http://${backendHost}:${backendPort}/${backendEndpoint}/logout`, {}, { withCredentials: true });
      console.log('Request Headers:', response.config.headers);
      console.log('Response Headers:', response.headers);
      if (response.data.message === 'success') {
        localStorage.setItem('token', '');
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant="contained" color="info" style={{ position: 'absolute', right: '10px' }} onClick={handleLogoutClick}>
      Logout
    </Button>
  );
}

export default LogoutButton;
