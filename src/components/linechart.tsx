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
    labels: [] as string[],
    temperature: [] as number[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const city = 'London'; // Replace with dynamic city or from context
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        // Extracting time and temperature from the API response
        const labels = data.list.map((item: any) => item.dt_txt); // Using dt_txt for time
        const temperatures = data.list.map((item: any) => item.main.temp); // Using main.temp for temperature

        setChartData({
          labels: labels,
          temperature: temperatures,
        });

        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching weather data:', error);
        setError(error.message);
        setLoading(false);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-lg uppercase font-bold ml-2 my-9 sm:ml-11 sm:text-2xl md:text-3xl">Line Chart for Hourly Temperatures for Daily Forecast</h2>
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
              yAxisID: 'y',
            },
          ],
        }}
        options={chartOptions}
      />
    </div>
  );
};

export default LineChart;
