import React, { useEffect, useState } from 'react';
import axios from 'axios';

async function checkAuth(setShowLoginMessage) {
  const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'localhost';
  const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
  const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'masterrecipe';

  try {
    const response = await axios.get(`http://${backendHost}:${backendPort}/${backendEndpoint}/user`, { withCredentials: true });
    const { is_authenticated } = response.data;
    //console.log(is_authenticated)
    if (is_authenticated === false) {
      setShowLoginMessage(true);
    }
  } catch (error) {
    setShowLoginMessage(true);
  }
}

export default function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    useEffect(() => {
      checkAuth(setShowLoginMessage);
    }, []);

    return (
      <>
        {showLoginMessage && <div style={{ color: 'red' }}>YOU NEED TO LOG IN</div>}
        {!showLoginMessage && <WrappedComponent {...props} />}
      </>
    );
  };
}
