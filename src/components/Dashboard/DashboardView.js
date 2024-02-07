import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DashboardView = ({ products, clients }) => {
  const productData = [
    { name: "Jan", sales: 200 },
    { name: "Feb", sales: 300 },
    { name: "Mar", sales: 400 },
    { name: "Apr", sales: 500 },
    { name: "May", sales: 600 },
    { name: "Jun", sales: 700 },
    { name: "Jul", sales: 800 },
    { name: "Aug", sales: 900 },
    { name: "Sep", sales: 1000 },
    { name: "Oct", sales: 1100 },
    { name: "Nov", sales: 1200 },
    { name: "Dec", sales: 1300 },
  ];

  const clientData = [
    { name: "Jan", signups: 20 },
    { name: "Feb", signups: 25 },
    { name: "Mar", signups: 30 },
    { name: "Apr", signups: 35 },
    { name: "May", signups: 40 },
    { name: "Jun", signups: 45 },
    { name: "Jul", signups: 50 },
    { name: "Aug", signups: 55 },
    { name: "Sep", signups: 60 },
    { name: "Oct", signups: 65 },
    { name: "Nov", signups: 70 },
    { name: "Dec", signups: 75 },
  ];

  return (
    <div>
      <h2>Product Sales</h2>
      <LineChart
        width={800}
        height={300}
        data={productData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>

      <h2>Client Signups</h2>
      <BarChart
        width={800}
        height={300}
        data={clientData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="signups" fill="#8836ff" />
      </BarChart>
    </div>
  );
};

DashboardView.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sales: PropTypes.number.isRequired,
    })
  ),
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      signups: PropTypes.number.isRequired,
    })
  ),
};

export default DashboardView;
