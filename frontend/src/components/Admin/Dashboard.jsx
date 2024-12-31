import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import AddProduct from './AddProduct';
import Sales from './Sales';
import AdminProducts from './AdminProducts';
import EditProducts from './EditProducts';
import axios from 'axios';
import ProfileForm from './ProfileForm';

const Dashboard = () => {
  const location = useLocation();
  const isadmin = localStorage.getItem('isadmin');
  const [adminproducts, setadminproducts] = useState([]);
  const [artist, setartist] = useState([]);
  const [count, setcount] = useState(0);
  const artistId = localStorage.getItem('artid');
  const [earned, setearned] = useState([]);
  const [leader, setleader] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [artistDetails, setArtistDetails] = useState(null);

  const isDashboardPage = location.pathname === '/dashboard';

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchArtistData = async (term) => {
    try {
      const response = await axios.get('http://localhost:4000/api/search');
      const artistData = response.data;
      setartist(artistData);

      const foundArtist = artistData.find((artist) => artist.name.toLowerCase() === term.toLowerCase());
      
      if (foundArtist) {
        setArtistDetails(foundArtist);
        console.log('Artist found', foundArtist);
      } else {
        setArtistDetails(null);
        console.log('Artist not found');
      }
    } catch (error) {
      setError('Error fetching artist data');
    }
  };

  const handleSearch = () => {
    fetchArtistData(searchTerm);
  };

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/productAdmin/${artistId}`);
        setadminproducts(response.data);
        setcount(response.data.length); 
      } catch (error) {
        setError('Error fetching artist data');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/earned/${artistId}`);
        setearned(response.data);
      } catch (error) {
        setError('Error fetching additional sales data');
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/leaderboard');
        setleader(response.data);
      } catch (error) {
        setError('Error fetching leaderboard data');
      }
    };

    fetchArtist();
    fetchProducts();
    fetchLeaderboard();
    setLoading(false);
  }, [artistId]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Seller Dashboard</h2>
        {/* <div className="mb-4">
          <input 
            type="text" 
            className="w-full px-4 py-2 rounded-md text-black" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <button 
            className="w-full mt-2 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white" 
            onClick={handleSearch}
          >
            Search
          </button>
        </div> */}
        <ul className="space-y-2">
          <li><Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Dashboard</Link></li>
          <li><Link to="/dashboard/add-product" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Add Product</Link></li>
          <li><Link to="/dashboard/products" className="block py-2 px-4 hover:bg-gray-700 rounded-md">View Products</Link></li>
          <li><Link to="/dashboard/sales" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Sales & Profit</Link></li>
          <li><Link to="/dashboard/profile" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        {isadmin ? (
          <h2 className="text-2xl font-bold mb-6">Welcome to the seller Dashboard</h2>
        ) : (
          <h2 className="text-xl text-red-500 font-bold">Access Denied</h2>
        )}

        {isDashboardPage && (
          <>
            <div className="bg-white p-6 rounded-md shadow-md mb-6">
              <h2 className="text-xl font-bold mb-4">Seller Overview</h2>
              <p>Here you can manage your products, track sales, and monitor performance.</p>
            </div>

            {artistDetails && (
              <div className="bg-white p-6 rounded-md shadow-md mb-6">
                <h3 className="text-lg font-bold">Seller Details</h3>
                <img src={artistDetails.img ? `http://localhost:4000/${artistDetails.img}` : ''} alt="Artist" className="w-24 h-24 rounded-full mb-4" />
                <p><strong>Name:</strong> {artistDetails.name}</p>
                <p><strong>Email:</strong> {artistDetails.email}</p>
                <p><strong>Contact Number:</strong> {artistDetails.contact}</p>
                <input type="text" className="w-full px-4 py-2 mt-4 rounded-md" placeholder="Message them" />
                <button className="mt-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Send</button>
              </div>
            )}

            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h4 className="text-lg font-bold">Total Products</h4>
                  <p className="text-2xl">{count}</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h4 className="text-lg font-bold">Total Sales</h4>
                  <p className="text-2xl">₹{earned.earnedAmount}</p>
                </div>
              </div>
            )}

            {/* <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-bold mb-4">Leaderboard</h3>
              {leader.map((data, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-md mb-4 hover:shadow-lg transition"
                >
                  <p className="text-gray-700 font-bold">{index + 1}. {data.name}</p>
                  {index === 0 && <span className="text-yellow-500 font-bold">👑 {data.badge}</span>}
                  <p className="text-green-600 font-bold">₹{data.earnedAmount}</p>
                </div>
              ))}
            </div> */}
          </>
        )}

        <Routes>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="sales" element={<Sales />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="edit-product/:id" element={<EditProducts />} />
          <Route path="profile" element={<ProfileForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
