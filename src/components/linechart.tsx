import React from 'react';
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

interface LineChartProps {
  data: {
    labels: string[]; // Time labels for the x-axis
    temperature: number[];
    humidity: number[];
    windSpeed: number[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.temperature,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        yAxisID: 'y-axis-1', // Link to the first y-axis
      },
      {
        label: 'Humidity (%)',
        data: data.humidity,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        yAxisID: 'y-axis-2', // Link to the second y-axis
      },
      {
        label: 'Wind Speed (m/s)',
        data: data.windSpeed,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
        yAxisID: 'y-axis-3', // Link to the third y-axis
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    //   'y-axis-1': {
    //     type: 'linear',
    //     position: 'left',
    //     title: {
    //       display: true,
    //       text: 'Temperature (°C)',
    //     },
    //     beginAtZero: true,
    //   },
    //   'y-axis-2': {
    //     type: 'linear',
    //     position: 'right',
    //     title: {
    //       display: true,
    //       text: 'Humidity (%)',
    //     },
    //     beginAtZero: true,
    //     grid: {
    //       drawOnChartArea: false, // Don't draw grid lines for this axis
    //     },
    //   },
    //   'y-axis-3': {
    //     type: 'linear',
    //     position: 'right',
    //     title: {
    //       display: true,
    //       text: 'Wind Speed (m/s)',
    //     },
    //     beginAtZero: true,
    //     grid: {
    //       drawOnChartArea: false, // Don't draw grid lines for this axis
    //     },
    //   },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
