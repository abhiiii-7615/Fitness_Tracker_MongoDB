import React, { useState, useEffect } from 'react';
import './calorie.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaPlus, FaUndo } from 'react-icons/fa';
import { logCalorie } from '../services/api';

const defaultFoods = [
  { name: 'Chapati', cal: 120, qty: '1 medium' },
  { name: 'White Rice', cal: 200, qty: '1 cup' },
  { name: 'Dal', cal: 180, qty: '1 cup' },
  { name: 'Paneer Curry', cal: 250, qty: '1 serving' },
  { name: 'Boiled Egg', cal: 78, qty: '1 egg' },
  { name: 'Banana', cal: 105, qty: '1 medium' },
  { name: 'Apple', cal: 95, qty: '1 medium' },
  { name: 'Upma', cal: 220, qty: '1 bowl' },
  { name: 'Dosa', cal: 165, qty: '1 dosa' },
  { name: 'Idli', cal: 58, qty: '1 idli' },
  { name: 'Curd Rice', cal: 190, qty: '1 cup' },
  { name: 'Vegetable Pulao', cal: 215, qty: '1 cup' },
  { name: 'Sambar', cal: 100, qty: '1 cup' },
];

const Calorie = () => {
  const username = localStorage.getItem('username');
  const today = new Date().toISOString().split('T')[0];

  const userLogKey = `calorieLogs_${username}`;
  const userGoalKey = `calorieGoal_${username}`;
  const dateKey = `calorieDate_${username}`;

  const [goal, setGoal] = useState(() => parseInt(localStorage.getItem(userGoalKey)) || 2000);
  const [inputGoal, setInputGoal] = useState(goal);
  const [logs, setLogs] = useState(() => {
    const savedDate = localStorage.getItem(dateKey);
    return savedDate === today ? JSON.parse(localStorage.getItem(userLogKey)) || [] : [];
  });
  const [customFood, setCustomFood] = useState({ name: '', cal: '' });

  const consumed = logs.reduce((sum, item) => sum + item.cal, 0);
  const percentage = Math.min((consumed / goal) * 100, 100).toFixed(0);

  const syncToDatabase = async (newLogs) => {
    if (!username) return;
    const newConsumed = newLogs.reduce((sum, item) => sum + item.cal, 0);
    try {
      await logCalorie({ username, date: today, calorieIntake: newConsumed });
    } catch (err) {
      console.error('Failed to sync calories:', err);
    }
  };

  useEffect(() => {
    localStorage.setItem(userLogKey, JSON.stringify(logs));
    localStorage.setItem(userGoalKey, goal);
    localStorage.setItem(dateKey, today);
    syncToDatabase(logs);
  }, [logs, goal, today]);

  useEffect(() => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    const resetAtMidnight = () => {
      setLogs([]);
      localStorage.setItem(userLogKey, JSON.stringify([]));
      localStorage.setItem(dateKey, new Date().toISOString().split('T')[0]);
      syncToDatabase([]);
    };

    const timeout = setTimeout(() => {
      resetAtMidnight();
      setInterval(resetAtMidnight, 24 * 60 * 60 * 1000); 
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  const handleAdd = (food) => {
    const updatedLogs = [...logs, food];
    setLogs(updatedLogs);
  };

  const removeLast = () => {
    const updatedLogs = logs.slice(0, -1);
    setLogs(updatedLogs);
  };

  const handleGoalChange = (e) => setInputGoal(e.target.value);
  const updateGoal = () => setGoal(Number(inputGoal));

  const handleCustomInput = () => {
    if (customFood.name && customFood.cal) {
      const newFood = { name: customFood.name, cal: parseInt(customFood.cal), qty: 'custom' };
      handleAdd(newFood);
      setCustomFood({ name: '', cal: '' });
    }
  };

  return (
    <div className="water-container">
      <div className="progress-section">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: '#e67e22',
            pathColor: '#f39c12',
            trailColor: '#fdf2e9',
            textSize: '18px',
          })}
        />
        <div className="summary">
          <p><strong>Consumed:</strong> {consumed} kcal</p>
          <p><strong>Goal:</strong> {goal} kcal</p>
          <p>You can eat <strong>{goal - consumed} kcal</strong> more</p>
        </div>
      </div>

      <div className="log-section">
        <h2>Log Calorie Intake</h2>
        <div className="food-list">
          {defaultFoods.map((food, i) => (
            <div key={i} className="food-card" onClick={() => handleAdd(food)}>
              <div>
                <p className="food-name">{food.name}</p>
                <p className="food-info">{food.cal} kcal, {food.qty}</p>
              </div>
              <button><FaPlus /></button>
            </div>
          ))}
        </div>

        <div className="custom-food">
          <h3>Custom Food</h3>
          <input
            type="text"
            placeholder="Food name"
            value={customFood.name}
            onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Calories"
            value={customFood.cal}
            onChange={(e) => setCustomFood({ ...customFood, cal: e.target.value })}
          />
          <button className="add" onClick={handleCustomInput}><FaPlus /> Add Custom</button>
        </div>

        <div className="action-buttons">
          <button className="add" onClick={removeLast}><FaUndo /> Remove Last</button>
        </div>

        <div className="goal-update">
          <label>Set Goal (kcal):</label>
          <input
            type="number"
            step="10"
            value={inputGoal}
            onChange={handleGoalChange}
          />
          <button onClick={updateGoal}>Update</button>
        </div>

        <p className="quote">🍽 "You are what you eat – choose wisely!"</p>
      </div>
    </div>
  );
};

export default Calorie;
