import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductsList from './components/ProductsList';
import ArtisianLogin from './components/ArtisianLogin';
import Dashboard from './components/Admin/Dashboard';
import './App.css';
import UserRegister from './components/UserRegister';
import AdminRegister from './components/Admin/AdminRegister';
import UserLogin from './components/UserLogin';
import CartPage from './components/CartPage';
import PaymentPage from './components/PaymentPage';
import UserProfile from './components/UserProfile';
import ProductOne from './components/productOne';

import AdminLogin from './components/Admin/AdminLogin';

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productsList" element={<ProductsList />} />
          <Route path="/artisian-register" element={<AdminRegister />} />
          <Route path="/artisian-login" element={<ArtisianLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path ='/cart' element={<CartPage />} />
          <Route path ='/payment' element={<PaymentPage />} />
          <Route path='/your-profile' element={<UserProfile  />} />
          <Route path='/product/:id' element={<ProductOne />} />
          <Route path= '/admin' element={<AdminLogin />} />
          
        </Routes>
      </Router>
  );
}

export default App;
