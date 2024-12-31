import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(""); // Category state
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products state
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterProducts = (category, searchTerm) => {
    return products.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("user");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    try {
      await axios.post("http://localhost:4000/api/addToCart", {
        productId: product._id,
        quantity: 1,
        userId: userId,
      });
      alert("Product added to cart successfully");
      navigate("/cart");
    } catch (error) {
      alert("Login to add product to cart");
    }
  };

  const handleWishToCart = async (product) => {
    const userId = localStorage.getItem("user");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    try {
      await axios.post("http://localhost:4000/api/wishlist", {
        productId: product._id,
        quantity: 1,
        userId: userId,
      });
      alert("Product added to wish_list successfully");
      navigate("/cart");
    } catch (error) {
      alert("Login to add product to Wishlist");
    }
  };

  const handleViewProduct = async (product) => {
    const productId = product._id;
    const userId = localStorage.getItem("user");

    try {
      await axios.post(`http://localhost:4000/api/productView/${productId}`, {
        userId: userId,
      });
      navigate(`/product/${productId}`);
    } catch (error) {
      alert("Failed to view product");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/productList")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(filterProducts(category, searchTerm));
  }, [category, searchTerm, products]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center mt-10">No products found.</div>;
  }

  return (
    <div
      className="container mx-auto p-20 bg-gray-100"
      style={{
        maxWidth: "1800px",
        background:
          "url('https://images.unsplash.com/photo-1557683316-973673baf926')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full md:w-64 p-2 border rounded-lg shadow-md"
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Beauty & Health">Beauty & Health</option>
          <option value="Sports & Outdoors">Sports & Outdoors</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-64 p-2 border rounded-lg shadow-md"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredProducts.map((product) => (
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden w-72 transform transition duration-300 hover:scale-105"
            key={product._id}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Artisan:{" "}
                {product.artisanId ? product.artisanId.name : "Unknown"}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                {product.description}
              </p>
              <p className="text-xl font-semibold text-gray-900 mb-4">
                ₹{product.price}
              </p>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-blue-600 transition"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md mb-2 hover:bg-green-600 transition"
                onClick={() => handleWishToCart(product)}
              >
                Add to Wishlist
              </button>

              <button
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
                onClick={() => handleViewProduct(product)}
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
