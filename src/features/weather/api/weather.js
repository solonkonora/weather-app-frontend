// // src/pages/api/weather.js
// export default async function handler(req, res) {
//     const { city } = req.query;// Store your API key in an .env file
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
  
//       if (response.ok) {
//         res.status(200).json(data);
//       } else {
//         res.status(404).json({ message: data.message });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching weather data" });
//     }
//   }