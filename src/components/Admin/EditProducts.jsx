import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditProducts = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://e-commerce-backend-5137.onrender.com/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

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
      const response = await axios.put(`https://e-commerce-backend-5137.onrender.com/api/product/${id}`, product);
      console.log(response.data);
      alert('Product updated successfully!');
      window.location.href ='/dashboard/products'
    } catch (error) {
      console.error('Error updating product:', error);
      alert('An error occurred while updating the product.');
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f4f9', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', color: '#333' }}>Edit Product</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '1.2rem', color: '#555' }}>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1rem',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '1.2rem', color: '#555' }}>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1rem',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '1.2rem', color: '#555' }}>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1rem',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '1.2rem', color: '#555' }}>Product Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1rem',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '15px 30px',
            fontSize: '1.2rem',
            backgroundColor: '#4A90E2',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
