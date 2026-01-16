import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
      <div className="sidebar">
      <button onClick={() => navigate('/dashboard/bmi')}>BMI Calculator</button>
      <button onClick={() => navigate('/dashboard/calories')}>Calories</button>
      <button onClick={() => navigate('/dashboard/water')}>Water</button>
      <button onClick={() => navigate('/dashboard/sleep')}>Sleep</button>
    </div>
  );
};

export default Sidebar;
