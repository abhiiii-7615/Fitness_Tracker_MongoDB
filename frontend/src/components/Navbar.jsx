import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>🏃‍♂️ FitTrack</div>
      <div className="nav-right">
        <img
          src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
          alt="Profile"
          className="profile-pic"
          onClick={() => navigate('/profile')}
        />
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
