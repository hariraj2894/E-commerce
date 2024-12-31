import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    badge: '',
    earnedAmount: '',
    img: null, 
  });

  const artid = localStorage.getItem('artid');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/${artid}`);
        setArtist(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          contact: response.data.contact,
          badge: response.data.badge,
          earnedAmount: response.data.earnedAmount,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [artid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('contact', formData.contact);
    formDataObj.append('badge', formData.badge);
    formDataObj.append('earnedAmount', formData.earnedAmount);
    if (formData.img) formDataObj.append('img', formData.img);
    
    try {
      const response = await axios.put(`http://localhost:4000/api/profilEdit/${artid}`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }, 
      });
      setArtist(response.data.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      setError(error.message);
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.profileContainer}>
      <h1 style={styles.title}>Your Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={styles.input} />
          </label>
          <label style={styles.label}>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={styles.input} />
          </label>
          <label style={styles.label}>
            Contact:
            <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required style={styles.input} />
          </label>
          <label style={styles.label}>
            Badge:
            <input type="text" name="badge" value={formData.badge} onChange={handleInputChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Earned Amount:
            <input type="number" name="earnedAmount" value={formData.earnedAmount} onChange={handleInputChange} style={styles.input} />
          </label>
          <label style={styles.label}>
            Profile Image:
            <input type="file" name="img" onChange={handleFileChange} style={styles.input} />
          </label>
          <button type="submit" style={styles.button}>Save Changes</button>
          <button type="button" onClick={handleEditToggle} style={styles.cancelButton}>Cancel</button>
        </form>
      ) : (
        <div style={styles.profileDetails}>
          <img src={artist.img ? `http://localhost:4000/${artist.img}` : ''} alt="Profile" style={styles.profileImage} />
          <div style={styles.profileInfo}>
            <h2>{artist.name}</h2>
            <p><strong>Email:</strong> {artist.email}</p>
            <p><strong>Contact:</strong> {artist.contact}</p>
            {/* <p><strong>Badge:</strong> {artist.badge}</p> */}
            <p><strong>Earned Amount:</strong> {artist.earnedAmount}</p>
          </div>
          <button onClick={handleEditToggle} style={styles.editButton}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  profileContainer: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  profileDetails: {
    textAlign: 'center',
  },
  profileImage: {
    width: '200px',
    height: '250px',
    borderRadius: '20%',
  },
  profileInfo: {
    marginTop: '10px',
  },
  editButton: {
    padding: '10px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
};

export default Profile;
