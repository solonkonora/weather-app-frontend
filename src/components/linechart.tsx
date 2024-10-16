
// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from 'chart.js';

// // Registering necessary components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const LineChart: React.FC = () => {
//   const hourlyData = {
//     labels: ["08:00", "09:00", "10:00", "11:00", "12:00"], // Example time labels
//     temperature: [20, 21, 23, 24, 26], // Example temperature values
//   };

//   const chartData = {
//     labels: hourlyData.labels, // Time labels for the x-axis
//     datasets: [
//       {
//         label: 'Temperature (°C)',
//         data: hourlyData.temperature, // Temperature values on the y-axis
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//         yAxisID: 'y', // Single y-axis for temperature
//       },
//     ],
//   };

//   // Properly typed chart options
//   const chartOptions: ChartOptions<'line'> = {
//     responsive: true,
//     interaction: {
//       mode: 'index',
//       intersect: false,
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Time', // Label for the x-axis showing time
//         },
//       },
//       y: {
//         type: 'linear',
//         position: 'left',
//         title: {
//           display: true,
//           text: 'Temperature (°C)', // Label for the y-axis
//         },
//         beginAtZero: true, // Start the temperature axis at 0
//       },
//     },
//   };

//   return (
//     <div>
//       <h2>Hourly Temperature Forecast</h2>
//       <Line data={chartData} options={chartOptions} />
//     </div>
//   );
// };

// export default LineChart;

"use client"
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Registering necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    temperature: [],
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}'); 
        const data = await response.json();
        
        // Transform the data to match the chart requirements
        const labels = data.hourly.map((item: any) => item.time); // Assuming `time` holds the time labels
        const temperatures = data.hourly.map((item: any) => item.temperature); // Assuming `temperature` holds the temperature values

        setChartData({
          labels: labels,
          temperature: temperatures,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []); // Empty dependency array means this effect runs once on mount

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time', // Label for the x-axis showing time
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°C)', // Label for the y-axis
        },
        beginAtZero: true, // Start the temperature axis at 0
      },
    },
  };

  return (
    <div>
      <h2>Hourly Temperature Forecast</h2>
      <Line
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: chartData.temperature,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              yAxisID: 'y'
            },
          ],
        }}
        options={chartOptions}
      />
    </div>
  );
};

export default LineChart;

