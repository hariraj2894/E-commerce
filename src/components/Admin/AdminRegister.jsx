import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', location: '', bio: '' });
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
      const response = await axios.post('https://e-commerce-backend-5137.onrender.com/api/artisianregister', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('artid', response.data.artid);
      localStorage.setItem('isadmin', response.data.admin);

      alert('Registration successful');
      window.dispatchEvent(new Event('storage')); // Notify navbar of changes
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("oii", error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Register</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-gray-600">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded-md transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
