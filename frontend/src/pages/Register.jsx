import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' ,age:0,height:0,weight:0});
  const navigate = useNavigate();

 const handleChange = (e) => {
  const { name, value } = e.target;
  const numericFields = ['age', 'height', 'weight'];
  setForm({
    ...form,
    [name]: numericFields.includes(name) ? parseFloat(value) || 0 : value,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  const formattedForm = {
    ...form,
    age: Number(form.age),
    height: Number(form.height),
    weight: Number(form.weight),
  };
  try {
    await registerUser(formattedForm);
    alert('Registered successfully');
    navigate('/login');
  } catch (err) {
    alert(err.response?.data?.message || 'Registration failed');
    navigate('/register');
  }
};


  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="age"  placeholder="Age" onChange={handleChange} required />
        <input name="height"  placeholder="Height" onChange={handleChange} required />
        <input name="weight"  placeholder="Weight" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
