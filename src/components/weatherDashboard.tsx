// // src/components/WeatherDashboard.tsx
// import { useState } from "react";
// import WeatherCard from "./weatherCard";

// const WeatherDashboard = () => {
//   const [city, setCity] = useState("");
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchWeather = async (e) => {
//     e.preventDefault();
//     if (!city) return;

//     setLoading(true);
//     setError("");
    
//     try {
//       const response = await fetch(`/api/weather?city=${city}`);
//       if (!response.ok) throw new Error("City not found");

//       const data = await response.json();
//       setWeatherData(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="weather-dashboard">
//       <h1>Weather Dashboard</h1>
//       <form onSubmit={fetchWeather}>
//         <input
//           type="text"
//           placeholder="Enter city"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           disabled={loading}
//         />
//         <button type="submit" disabled={loading}>Get Weather</button>
//       </form>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}
//       {weatherData && <WeatherCard data={weatherData} />}
//     </div>
//   );
// };

// export default WeatherDashboard;