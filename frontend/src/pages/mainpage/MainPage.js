import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './MainPage.css';
import axios from 'axios';
import logoMasterRecipe from '../../assets/images/MasterRecipeW.png';
import mainMasterRecipe from '../../assets/images/MasterRecipe.png';
import Register from '../../components/user/Register';
import Login from '../../components/user/Login';
import LogoutButton from '../../components/user/Logout';

function MainPage() {
  const backendHost = process.env.REACT_APP_MASTERRECIPE_BACKEND_HOST || 'localhost';
  const backendPort = process.env.REACT_APP_MASTERRECIPE_BACKEND_PORT || 8000;
  const backendEndpoint = process.env.REACT_APP_MASTERRECIPE_BACKEND_ENDPOINT || 'masterrecipe';

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://${backendHost}:${backendPort}/${backendEndpoint}/user`, { withCredentials: true });
      if (response && response.data) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <div className="navbar-nav">
            {!isLoggedIn && (
              <>
                <Link to="/register" className="nav-item nav-link">
                  Register
                </Link>
                <Link to="/" className="nav-item nav-link">
                  <img src={logoMasterRecipe} alt="LH Home Page" style={{ width: '87px', height: '57px' }} />
                </Link>
                <Link to="/login" className="nav-item nav-link">
                  Login
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link to="/homepage" className="nav-item nav-link">
                  <img src={logoMasterRecipe} alt="LH Home Page" style={{ width: '100px', height: '60px' }} />
                </Link>

                <Link to="/create-story" className="nav-item nav-link">
                  New Story
                </Link>

                <Link to="/story_search" className="nav-item nav-link">
                  Search
                </Link>

                <Link to="/user-profile" className="nav-item nav-link">
                  Profile
                </Link>
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <LogoutButton />
                  </div>
                </>
              </>
            )}
          </div>
        </nav>
        <Routes>
          {!isLoggedIn && (
            <>
              <Route path="*" element={<Navigate to="/" />} />
              <Route
                path="/"
                element={
                  <div className="home-container">
                    <img src={mainMasterRecipe} alt="Master Recipe" style={{ width: '900px', height: 'auto' }} />
                  </div>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
            </>
          )}

          {isLoggedIn && (
            <>
              <Route path="*" element={<Navigate to="/homepage" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default MainPage;
