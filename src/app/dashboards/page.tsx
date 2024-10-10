"use client";

import React from 'react';
import Navbar from '@/src/components/navbar';
import Operations from '../../components/weatherOperations';
// import ProtectedRoute from '../../components/ProtectedRoute';

const Dashboard = () => {
  return (
    // <ProtectedRoute>
    //   <div className="dashboard-container">
    //     <h1>Dashboard</h1>
    //     <Operations />
    //   </div>
    // </ProtectedRoute> */}
    <div className="dashboard-container">
      <Navbar />
      <Operations />
    </div>


  );
};

export default Dashboard;

