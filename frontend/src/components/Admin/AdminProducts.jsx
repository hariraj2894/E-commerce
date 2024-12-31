import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const [products, setProducts] = useState([]); // Ensure products is initialized as an array
  const [loading, setLoading] = useState(true);
  const artistId = localStorage.getItem('artid'); // Ensure 'artid' is set properly during login
  
  useEffect(() => {
    if (!artistId) {
      console.error('Artist ID not found');
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/productAdmin/${artistId}`);
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [artistId]); // Re-run if artistId changes
  
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!products.length) {
    return <h2>No products found</h2>; // Handle case where no products are found
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f4f9', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', color: '#333' }}>Product List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Description</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Price</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{product.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{product.description}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>₹{product.price}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <Link to={`/dashboard/edit-product/${product._id}`} style={{ marginRight: '10px' }}>Edit</Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
