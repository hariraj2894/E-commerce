import React, { useState ,useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { state } = useLocation();
  const { cart = [], totalPrice = 0 } = state || {};
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(false);
  const artistId = cart[0]["artisanId"]["_id"];
  const [paid , setPaid] = useState(false);
  const userId = localStorage.getItem("user");

  console.log('cart', artistId);
  const handlePayment = async () => {
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK failed to load. Please refresh the page.");
      return;
    }

    try {
      const { data: razorpayOrder } = await axios.post("http://localhost:4000/api/create-order", {
        amount: totalPrice * 100, // Amount in the smallest currency unit
      });
      const options = {
        key: "rzp_test_0DC1JJeT6tllnC", // Replace with your Razorpay key
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,
        name: "Your Store Name",
        description: "Test Transaction",
        handler: async (response) => {
          const result = await axios.post("http://localhost:4000/api/confirm-payment", {
            orderId: razorpayOrder.id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
          if (result.data.status === "success") {
            setPaid(true);
            alert("Payment successful!");
            window.location.href = "/";
          }
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "1234567890",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error in payment:", error);
    }
  };

  const productData = cart.map(item => ({
    productId: item._id, 
    quantity: item.quantity,
    pname: item.name,
  }));
  useEffect(() => {
    if (paid) {
      axios.post("http://localhost:4000/api/updateearned", { artisianId: artistId, amount: totalPrice });
      axios.post("http://localhost:4000/api/usercart", { userId, quantity: cart.length, productIds: productData, address })
// console.log('response', response);
    }
  }, [paid]);
  const handleAddressChange = (e) => {
    const inputAddress = e.target.value;
    setAddress(inputAddress);
    const isValidAddress = /^[a-zA-Z0-9\s,'-]{5,}$/.test(inputAddress);
    setIsAddressValid(isValidAddress);
  };

  return (
    <div className="p-10 bg-gradient-to-r from-white to-gray-200 rounded-lg max-w-2xl mx-auto mt-12 shadow-xl font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 uppercase tracking-wider">Payment Details</h1>
      <div className="flex flex-col gap-5 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Cart Items</h2>
        {cart.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="flex items-center p-5 bg-white rounded-lg shadow-md hover:transform hover:translate-y-2 hover:shadow-lg transition">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-5" />
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold text-gray-700">{item.name}</p>
                <p className="text-lg text-gray-600">₹{item.price}</p>
                <p className="text-md text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-lg text-red-600 font-semibold">Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))
        )}
        <div className="mt-4 text-right text-xl font-semibold text-gray-800">
          <h3>Total: ₹{totalPrice}</h3>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Enter Your Address</h2>
        <textarea
          placeholder="Enter your delivery address"
          value={address}
          onChange={handleAddressChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {!isAddressValid && <p className="text-red-500 text-sm mt-2">Please enter a valid address with at least 5 characters.</p>}
      </div>

      <button
        onClick={handlePayment}
        className={`${isAddressValid ? "bg-gradient-to-r from-purple-600 to-blue-500" : "bg-gray-400 cursor-not-allowed"} text-white py-3 rounded-lg text-lg font-semibold hover:scale-105 transition`}
        disabled={!isAddressValid}
      >
        Pay Online
      </button>

      {paymentStatus && <p className="text-xl text-center mt-6 font-semibold text-green-600">{paymentStatus}</p>}
    </div>
  );
};

export default PaymentPage;
