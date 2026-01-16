import React, { useState, useEffect } from 'react';
import './sleep.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaPlus, FaUndo } from 'react-icons/fa';
import { logSleep } from '../services/api';

const Sleep = () => {
  const username = localStorage.getItem('username');
  const today = new Date().toISOString().split('T')[0];

  const [goal, setGoal] = useState(() => parseFloat(localStorage.getItem('sleepGoal')) || 8);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState(() => {
    const storedDate = localStorage.getItem('sleepLastUpdated');
    return storedDate === today
      ? JSON.parse(localStorage.getItem('sleepLogs')) || [] 
      : [];
  });

  const total = logs.reduce((sum, val) => sum + parseFloat(val), 0);
  const percentage = Math.min((total / goal) * 100, 100).toFixed(0);

  useEffect(() => {
    localStorage.setItem('sleepLogs', JSON.stringify(logs));
    localStorage.setItem('sleepGoal', goal);
    localStorage.setItem('sleepLastUpdated', today);

    if (username) {
      logSleep({
        username,
        date: today,
        sleepHours: total
      });
      console.log("💾 Sleep log stored in DB");
    }
  }, [logs, goal, today, total, username]);

  useEffect(() => {
    const now = new Date();
    const resetTime = new Date();
    resetTime.setHours(24, 0, 0, 0);
    const msUntilReset = resetTime - now;
    const resetTimeout = setTimeout(() => {
      setLogs([]);
      localStorage.setItem('sleepLogs', JSON.stringify([]));
      localStorage.setItem('sleepLastUpdated', new Date().toISOString().split('T')[0]);
      console.log("🔄 Sleep logs reset at 00:00");
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
    <div className="sleep-container">
      <div className="progress-section">
       <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
            textColor: '#4a148c',
            pathColor: '#7e57c2',
            trailColor: '#e1bee7',
            textSize: '20px',
            pathTransitionDuration: 0.5,
        })}
        />
        <div className="summary">
          <p><strong>Slept:</strong> {total.toFixed(2)} hrs</p>
          <p><strong>Goal:</strong> {goal} hrs</p>
          <p>You need <strong>{(goal - total).toFixed(2)} hrs</strong> more sleep</p>
        </div>
      </div>

      <div className="log-section">
        <h2>Log Sleep</h2>
        <input
          type="number"
          step="0.1"
          placeholder="Hours"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="quick-buttons">
          {[1, 2, 3].map((val) => (
            <button key={val} onClick={() => setInput(val)}>{val} hrs</button>
          ))}
        </div>
        <div className="action-buttons">
          <button className="add" onClick={handleLog}><FaPlus /> Add</button>
          <button className="remove" onClick={removeLast}><FaUndo /> Remove Last</button>
        </div>

        <div className="goal-update">
          <label>Set Goal (hrs):</label>
          <input
            type="number"
            step="0.1"
            value={goal}
            onChange={handleGoalChange}
          />
        </div>

        <p className="quote">🛌 "Sleep is the best meditation. Get your full rest!"</p>
      </div>
    </div>
  );
};

export default Sleep;