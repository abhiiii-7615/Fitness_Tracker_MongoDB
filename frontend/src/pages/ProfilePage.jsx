import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';
import './Profile.css';
import Navbar from "../components/Navbar";
import {useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  function handleHome(){
     navigate('/dashboard');
  };

  return (
    <>
     <Navbar/>
    <div className="profile-container">
      <h2>User Profile</h2>
      <img src="https://www.nicepng.com/png/full/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="User" className="profile-avatar" />
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Height:</strong> {user.height} cm</p>
      <p><strong>Weight:</strong> {user.weight} kg</p>
      <button className="home-btn" onClick={handleHome}>Go back to Home</button>
    </div>
    </>
  );
};

export default ProfilePage;
