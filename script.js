const handleWeather = () => {
  const apiKey = 'c039bdb1de1b63a9ab7dc003ca6a5359'; // Your OpenWeather API key
  let weatherData;

  // Check if geolocation is available
  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
          // Get the user's current latitude and longitude
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // Log the coordinates for debugging
          console.log(`Lat: ${lat}, Lon: ${lon}`);
  
          // Make the API request to OpenWeather using user's location
          axios
              .get(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
              )
              .then((res) => {
                  // Store the response data in weatherData
                  weatherData = res.data;
  
                  // Display the weather data on the webpage
                  displayWeatherData(weatherData);
              })
              .catch((err) => {
                  // Log errors if the API request fails
                  console.error("Error fetching weather data:", err);
              });
      }, (error) => {
          console.error("Error getting the location:", error);
          alert("Unable to get your location. Please check location settings.");
      });
  } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by your browser.");
  }
};

const displayWeatherData = (weatherData) => {
  // Get the HTML element where weather data will be displayed
  const weatherDataElement = document.getElementById("weather-data");

  // Ensure the element exists before trying to update its content
  if (weatherDataElement) {
      weatherDataElement.innerHTML = `
          <p>Temperature: ${weatherData.main.temp}°C</p>
          <p>Humidity: ${weatherData.main.humidity}%</p>
          <p>Weather: ${weatherData.weather[0].description}</p>
      `;
  } else {
      // Log an error if the element is not found
      console.error("Element with ID 'weather-data' not found.");
  }
};

// Call the handleWeather function to fetch and display weather data
handleWeather();
