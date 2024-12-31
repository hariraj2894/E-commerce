import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductOne = () => {
  const { id } = useParams(); // Get the 'id' from URL
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return; // If no id is available, don't fetch
        const response = await axios.get(`https://e-commerce-backend-5137.onrender.com/api/product/${id}`);
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [id]); // Run effect when 'id' changes

  // Style objects for each section of the component
  const containerStyle = {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  };

  const productCardStyle = {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const productNameStyle = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "10px",
  };

  const productPriceStyle = {
    fontSize: "1.5rem",
    color: "#28a745",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const productDescriptionStyle = {
    fontSize: "1rem",
    color: "#777",
    marginBottom: "20px",
  };

  const errorStyle = {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  };

  const loadingStyle = {
    textAlign: "center",
    fontSize: "1.25rem",
    color: "#555",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Product Details</h1>
      {error && <p style={errorStyle}>Error: {error}</p>}
      {products ? (
        <div style={productCardStyle}>
            <img src={products.image} alt="" />
          <h2 style={productNameStyle}>{products.name}</h2>
          <p style={productPriceStyle}>Price: ₹{products.price}</p>
          <p style={productDescriptionStyle}>{products.description}</p>
          <p>Artisan: <strong>{products?.artisanId?.name}</strong></p>
        </div>
      ) : (
        <p style={loadingStyle}>Loading product...</p>
      )}
    </div>
  );
};

export default ProductOne;
