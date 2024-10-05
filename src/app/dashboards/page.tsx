"use client";

import React from 'react';
import Operations from '../../components/weatherOperations';
// import WeatherData from '../../components/weatherData';
// import ProtectedRoute from '../../components/ProtectedRoute';

const Dashboard = () => {
  return (
    // <ProtectedRoute>
    //   <div className="dashboard-container">
    //     <h1>Dashboard</h1>
    //     <WeatherData 
    //     <Operations />
    //   </div>
    // </ProtectedRoute> */}
    <div className="dashboard-container">
         <Operations />
       </div>


  );
};

export default Dashboard;

