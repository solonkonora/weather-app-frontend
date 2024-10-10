"use client";

import React from 'react';
import Navbar from '@/src/components/navbar';
import Operations from '../../components/weatherOperations';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Operations />
    </div>


  );
};

export default Dashboard;

