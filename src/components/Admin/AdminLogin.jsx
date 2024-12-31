import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setLoading(true);

    try {
      // Send POST request to the backend API for login
      const response = await axios.post('http://localhost:4000/api/superLogin', {
        username: username,
        password: password,
      });

      // If successful, handle the response (e.g., store JWT token, redirect, etc.)
      if (response.status === 200) {
        alert('Login successful!');
        // You could redirect to the dashboard or store the adminId in localStorage, etc.
        localStorage.setItem('adminId', response.data.adminId);
        localStorage.setItem('role', 'artisan');
        localStorage.setItem('token', response.data.token);
        // Redirect to dashboard (example)
        window.location.href = '/superadmin';
      }
    } catch (error) {
      // If there's an error (e.g., invalid credentials), show the error message
      if (error.response) {
        setErrorMessage(error.response.data.message || 'An error occurred');
      } else {
        setErrorMessage('Network error, please try again');
      }
    } finally {
      setLoading(false); // Stop loading spinner once request is complete
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white text-lg font-medium ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {errorMessage && (
        <p className="text-red-500 text-center mt-4">{errorMessage}</p>
      )}
    </div>
  );
};

export default AdminLogin;
