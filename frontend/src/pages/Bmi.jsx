import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';
import './Bmi.css';

function Bmi() {
  const [user, setUser] = useState(null);
  const [custom, setCustom] = useState({ age: '', height: '', weight: '' });
  const [customBmi, setCustomBmi] = useState(null);

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

  const calculateBmi = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustom({ ...custom, [name]: value });
  };

  const handleCustomCalculate = () => {
    const { height, weight } = custom;
    if (height && weight) {
      const bmi = calculateBmi(parseFloat(weight), parseFloat(height));
      setCustomBmi(bmi);
    }
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    else if (bmi < 24.9) return 'Normal weight';
    else if (bmi < 29.9) return 'Overweight';
    else return 'Obese';
  };

  if (!user) return <p>Loading profile...</p>;

  const userBmi = calculateBmi(user.weight, user.height);
  const userCategory = getBmiCategory(userBmi);

  return (
    <div className="bmi-container">
      <h1>Body Mass Index (BMI) Calculator</h1>
      <p className="description">
        BMI is a measure of body fat based on your weight in relation to your height. It's a simple way to determine whether you're underweight, normal weight, overweight, or obese.
      </p>
      <div className="ranges">
        <p><strong>BMI Ranges:</strong></p>
        <ul>
          <li>Underweight: BMI &lt; 18.5</li>
          <li>Normal weight: 18.5 ≤ BMI &lt; 24.9</li>
          <li>Overweight: 25 ≤ BMI &lt; 29.9</li>
          <li>Obese: BMI ≥ 30</li>
        </ul>
      </div>

      <div className="user-bmi">
        <h2>Your BMI</h2>
        <p><strong>BMI:</strong> {userBmi}</p>
        <p><strong>Category:</strong> {userCategory}</p>
      </div>

      <div className="custom-bmi">
        <h2>Calculate BMI for Family Member</h2>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={custom.age}
          onChange={handleChange}
        />
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={custom.height}
          onChange={handleChange}
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={custom.weight}
          onChange={handleChange}
        />
        <button onClick={handleCustomCalculate}>Calculate BMI</button>
        {customBmi && (
          <div className="result">
            <p><strong>BMI:</strong> {customBmi}</p>
            <p><strong>Category:</strong> {getBmiCategory(customBmi)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bmi;