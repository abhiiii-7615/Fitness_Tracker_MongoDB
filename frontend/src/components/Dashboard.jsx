import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://fitness-tracker-p05w.onrender.com');

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const [sleepData, setSleepData] = useState([]);
  const [waterData, setWaterData] = useState([]);
  const [calorieData, setCalorieData] = useState([]);

  const fetchWeeklyStats = useCallback(async () => {
    const today = new Date();
    const endDate = today.toISOString().split('T')[0];
    
    const generateLast7Days = () => {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        days.push(date.toISOString().split('T')[0]);
      }
      return days;
    };

    const endpoints = [
      { key: 'sleep', setter: setSleepData },
      { key: 'water', setter: setWaterData },
      { key: 'calorie', setter: setCalorieData }
    ];

    const days = generateLast7Days();

    for (let { key, setter } of endpoints) {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/${key}/weekly`, {
          params: { username, endDate }
        });
        const rawData = Array.isArray(res.data) ? res.data : [];

        const mapped = days.map(date => {
          const log = rawData.find(item => {
            if (!item?.date) return false;
            const itemDate = typeof item.date === 'string'
              ? item.date.split('T')[0]
              : new Date(item.date).toISOString().split('T')[0];
            return itemDate === date;
          });
          let value = 0;
          if (key === 'sleep') value = log?.sleepHours || 0;
          if (key === 'water') value = log?.waterIntake || 0;
          if (key === 'calorie') value = log?.calorieIntake || 0;
          return { date: date.slice(5), value };
        });

        setter(mapped);
      } catch (err) {
        console.error(`Failed to fetch ${key} stats`, err);
      }
    }
  }, [username]);

  useEffect(() => {
    fetchWeeklyStats();
  }, [fetchWeeklyStats]);

  const renderCard = (title, data, color) => (
    <div className="chart-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-main">
        <Sidebar />
        <div className="dashboard-content">
          <h2>Welcome to FitTrack!</h2>
          <p>Select an option from the sidebar to start tracking your health.</p>

          <div className="charts-section">
            {renderCard('Sleep (hrs)', sleepData, '#9575cd')}
            {renderCard('Water (L)', waterData, '#4fc3f7')}
            {renderCard('Calories ', calorieData, '#ff8a65')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
