"use client";

import React from 'react';
import WeatherData from '../../components/weatherData';
import Operations from '../../components/weatherOperations';
import ProtectedRoute from '../../components/ProtectedRoute';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <WeatherData weather={{
                  temperature: 0,
                  description: '',
                  icon: '',
                  humidity: 0,
                  windSpeed: 0
              }}/>
        <Operations />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

