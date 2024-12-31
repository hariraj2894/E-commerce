import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sales = () => {
  const artistId = localStorage.getItem('artid'); // Ensure 'artid' is set properly during login
  const [salesData, setSalesData] = useState([]);
  const [additionalSalesData, setAdditionalSalesData] = useState([]); // State for another API call
console.log(artistId);
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/productAdmin/${artistId}`);
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    const fetchAdditionalSalesData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/earned/${artistId}`);
        setAdditionalSalesData(response.data); // Update state with additional sales data
      } catch (error) {
        console.error('Error fetching additional sales data:', error);
      }
    };

    fetchSalesData();
    fetchAdditionalSalesData();
  }, [artistId]);

  const tableHeaderStyle = {
    backgroundColor: '#4A90E2',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  };

  const tableCellStyle = {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
  };

  return (
    <div>
      <h2>Sales & Profit Data</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            {/* <th style={tableHeaderStyle}>Date</th> */}
            <th style={tableHeaderStyle}>Products</th>
            <th style={tableHeaderStyle}>Description</th>
            <th style={tableHeaderStyle}>Views</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((data, index) => (
            <tr key={index}>
              {/* <td style={tableCellStyle}>{data.date}</td> */}
              <td style={tableCellStyle}>{data.name}</td>
              <td style={tableCellStyle}>{data.description}</td>
              <td style={tableCellStyle}>{data.views}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <h1>Total sales: ₹ {additionalSalesData.earnedAmount}.00</h1>
<h2>Profit Earned: ₹ {additionalSalesData.earnedAmount > 59 ? additionalSalesData.earnedAmount - 59 : 0}.00</h2>

    </div>
  );
};

export default Sales;
