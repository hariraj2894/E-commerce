import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = localStorage.getItem('user'); // The logged-in user's ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/userprofile/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Authorization header with JWT
          }
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.response?.data?.message || 'Failed to load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const styles = {
    container: {
      width: '100%',
      maxWidth: '500px',
      margin: '40px auto',
      marginTop: '100px',
      padding: '30px',
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      marginBottom: '20px',
    },
    userName: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
    },
    userDetails: {
      fontSize: '18px',
      color: '#555',
      lineHeight: '1.6',
      textAlign: 'left',
    },
    cartContainer: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
    },
    cartHeader: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    cartList: {
      listStyleType: 'none',
      padding: 0,
    },
    cartItem: {
      padding: '10px 0',
      borderBottom: '1px solid #e0e0e0',
      color: '#555',
    },
    loading: {
      textAlign: 'center',
      fontSize: '20px',
      color: '#3498db',
      fontWeight: 'bold',
    },
    error: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#e74c3c',
      fontWeight: 'bold',
    },
    noData: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#888',
    },
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;

  if (error) return <p style={styles.error}>{error}</p>;

  if (!userData) return <p style={styles.noData}>No user profile found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.userName}>Welcome, {userData.name || 'Guest'}!</h1>
      </div>
      <div style={styles.userDetails}>
        <p><strong>Name: </strong>{userData.name}</p>
        <p><strong>Email:</strong> {userData.email || 'No email available'}</p>
        {/* <p><strong>COD Usage Count:</strong> {userData.codCount}</p> */}
      </div>
      <div style={styles.cartContainer}>
        <h3 style={styles.cartHeader}>Products Purchased</h3>
        {userData.cart && userData.cart.length > 0 ? (
          <ul style={styles.cartList}>
            {userData.cart.map((item) => (
              <li key={item._id} style={styles.cartItem}>
                <strong>Product ID:</strong> {item.productId} | <strong>Quantity:</strong> {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found in cart.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
