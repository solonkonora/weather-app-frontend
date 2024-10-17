"use client";

import React from 'react';
import Navbar from '@/src/components/navbar';
import Operations from '../../../components/weatherOperations';
import Forecast from '@/src/components/forecast';
import DailyForecast from '@/src/components/dailyforecast';
// import LineChart from '@/src/components/linechart';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Operations />
      <Forecast/>
      <DailyForecast />
      {/* <LineChart /> */}
    </div>
  );
};

export default Dashboard;

