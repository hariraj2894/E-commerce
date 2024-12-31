import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  const [artisanId, setArtisanId] = useState(null); // Store the artisan ID

  useEffect(() => {
    // Assuming the artisan's token is stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the JWT to get the artisan's ID (if JWT contains it)
      const artisanData = parseJwt(token);
      setArtisanId(artisanData.id); // Assuming the ID is stored as `id` in JWT payload
    }
  }, []);

  // Function to parse JWT token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token for authentication
      const response = await axios.post(
        'http://localhost:4000/api/product',
        { ...product, artisanId }, // Include artisanId in the request body
        {
          headers: {
            Authorization: `Bearer ${token}` // Send the token in the headers
          }
        }
      );
      console.log(response.data);
      alert('Product added successfully!');
      setProduct({ name: '', description: '', price: '', image: '' }); // Clear form after success
    } catch (error) {
      console.error(error);
      alert('An error occurred! Please check the console for more information.');
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f4f9', textAlign: 'center', marginTop: '-5%' }}>
      <h2 style={{ fontSize: '2rem', color: '#333' }}>Add Your Product</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '1.2rem', color: '#555' }}>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '1.2rem', color: '#555' }}>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            style={{ width: '100%', padding: '10px', fontSize: '1rem', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '1.2rem', color: '#555' }}>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '1.2rem', color: '#555' }}>Product Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '1.2rem', color: '#555' }}>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Beauty & Health">Beauty & Health</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          style={{ padding: '15px 30px', fontSize: '1.2rem', backgroundColor: '#4A90E2', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
