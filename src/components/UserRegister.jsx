import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://e-commerce-backend-5137.onrender.com/api/userregister', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('role', response.data.user.role);
      alert('Registration successful 🎉, LOgin Once for the Purchase');
      window.dispatchEvent(new Event('storage')); // Notify navbar of changes
      window.location.href = '/user-login'
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-24 p-8 bg-gradient-to-r from-blue-100 via-purple-200 to-blue-200 shadow-lg rounded-xl">
      <h2 className="text-center text-3xl font-semibold text-gray-700 mb-6">User Register</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-bold text-gray-600">Name:</label>
          <input
            type="name"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-bold text-gray-600">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-bold text-gray-600">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-4 text-white font-bold rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-all"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Already have an account? <a href="/artisian-register" className="text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  );
};

export default UserRegister;


