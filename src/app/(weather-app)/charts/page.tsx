"use client"
import React, { useState, useEffect } from 'react';
// import LineChart from '../../components/linechart';
import Forecast from '@/src/components/forecast';
import DailyForecast from '@/src/components/dailyforecast';

const LineChartPage: React.FC = () => {
//   const [chartData, setChartData] = useState({
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'], // Sample labels
//     temperature: [22, 20, 18],
//     humidity: [65, 60, 55],
//     windSpeed: [3.5, 2.8, 3.0],
//   });

//   // Fetch weather data (or other historical data) and update chartData
//   useEffect(() => {
//     // You can fetch historical data here and update `chartData`
//   }, []);

  return (
    <div>
      <Forecast />
      <DailyForecast/>

      {/* <h2>Weather Line Chart</h2> */}
      {/* <LineChart data={chartData} /> */}
    </div>
  );
};

export default LineChartPage;


