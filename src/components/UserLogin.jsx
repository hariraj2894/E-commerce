import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://e-commerce-backend-5137.onrender.com/api/userlogin', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('admin', response.data.admin);
      localStorage.setItem('user', response.data.userid);
      if (response.data.codCount >= 5) {
        localStorage.setItem('allowCOD', 'false');
      } else {
        localStorage.setItem('allowCOD', 'true');
      }

      alert('Login successful');
      window.dispatchEvent(new Event('storage')); // Notify navbar of changes
      window.location.href = '/';

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-24 p-8 bg-gradient-to-r from-blue-100 via-purple-200 to-blue-200 shadow-lg rounded-xl">
      <h2 className="text-center text-3xl font-semibold text-gray-700 mb-6">User Login</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Don't have an account? <a href="/artisian-register" className="text-blue-600 hover:underline">Register</a>
      </p>
    </div>
  );
};

export default UserLogin;
