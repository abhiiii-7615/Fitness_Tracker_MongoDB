import React, { useState, useEffect } from 'react';
import './water.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaPlus, FaUndo } from 'react-icons/fa';
import { logWater } from '../services/api';

const Water = () => {
  const username = localStorage.getItem('username');
  const today = new Date().toISOString().split('T')[0];

  const [goal, setGoal] = useState(() => parseFloat(localStorage.getItem('goal')) || 3);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState(() => {
    const storedDate = localStorage.getItem('lastUpdatedDate');
    return storedDate === today
      ? JSON.parse(localStorage.getItem('logs')) || []
      : [];
  });

  const total = logs.reduce((sum, val) => sum + parseFloat(val), 0);
  const percentage = Math.min((total / goal) * 100, 100).toFixed(0);

   useEffect(() => {
    localStorage.setItem('logs', JSON.stringify(logs));
    localStorage.setItem('goal', goal);
    localStorage.setItem('lastUpdatedDate', today);

    if (username) {
      logWater({
        username,
        date: today,
        waterIntake: total
      });
      console.log("💾 Water log stored in DB ");
    }
  }, [logs, goal,today,total,username]);


  useEffect(() => {
    const now = new Date();
    const resetTime = new Date();
    resetTime.setHours(24, 0, 0, 0);
    const msUntilReset = resetTime - now;
    const resetTimeout = setTimeout(() => {
      setLogs([]);
      localStorage.setItem('logs', JSON.stringify([]));
      localStorage.setItem('lastUpdatedDate', new Date().toISOString().split('T')[0]);
      console.log("🔄 Water logs reset at 00:00");
    }, msUntilReset);

    return () => clearTimeout(resetTimeout);
  }, []);

  const handleLog = () => {
    if (!input) return;
    setLogs([...logs, parseFloat(input)]);
    setInput('');
  };

  const removeLast = () => {
    const updatedLogs = [...logs];
    updatedLogs.pop();
    setLogs(updatedLogs);
  };

  const handleGoalChange = (e) => {
    setGoal(parseFloat(e.target.value));
  };

  return (
    <div className="water-container">
      <div className="progress-section">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: '#007bff',
            pathColor: '#00c6ff',
            trailColor: '#d3f3ff',
            textSize: '18px',
          })}
        />
        <div className="summary">
          <p><strong>Current:</strong> {total.toFixed(2)} L</p>
          <p><strong>Goal:</strong> {goal} L</p>
          <p>You need <strong>{(goal - total).toFixed(2)} L</strong> more</p>
        </div>
      </div>

      <div className="log-section">
        <h2>Log Water Intake</h2>
        <input
          type="number"
          step="0.01"
          placeholder="Liters"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="quick-buttons">
          {[0.25, 0.5, 1].map((val) => (
            <button key={val} onClick={() => setInput(val)}>{val * 1000}ml</button>
          ))}
        </div>
        <div className="action-buttons">
          <button className="add" onClick={handleLog}><FaPlus /> Add</button>
          <button className="remove" onClick={removeLast}><FaUndo /> Remove Last</button>
        </div>

        <div className="goal-update">
          <label>Set Goal (L):</label>
          <input
            type="number"
            step="0.1"
            value={goal}
            onChange={handleGoalChange}
          />
        </div>

        <p className="quote">💧 "Small sips make a big difference. Stay hydrated!"</p>
      </div>
    </div>
  );
};

export default Water;
