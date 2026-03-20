function searchWeather() {
  const apiKey = 'b1ba8cd3f5fc0b4ded05b96a4fa58b2a';
  const city = document.getElementById('cityInput').value.trim();
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  if(!navigator.onLine){
    document.getElementById('error').textContent = 'You are offline. Please check your internet connection.';
    document.getElementById('error').style.display = 'block';
    return; 
  
  }

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found');
        } else if (response.status === 401) {
          throw new Error('Invalid API key');
        } 
        else {
          throw new Error('An error occurred while fetching weather data');
        }
      }
      return response.json();
    })
    .then(data => {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); 
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const visibility = data.visibility / 1000;

      document.getElementById('city').textContent = cityName;
      document.getElementById('temperature').textContent = temperature + '°C';
      document.getElementById('description').textContent = description;
      document.getElementById('humidity').textContent = 'Humidity: ' + humidity + '%';
      document.getElementById('wind').textContent = 'Wind Speed: ' + windSpeed + ' m/s';
      document.getElementById('visibility').textContent = 'Visibility: ' + visibility + ' km';

      updateBackground(data.weather[0].main.toLowerCase());
      document.getElementById('error').textContent = '';
      document.getElementById('error').style.display = 'none';
    })
    .catch(error => {
      document.getElementById('error').textContent = error.message;
      document.getElementById('error').style.display = 'block';
    });
}

function updateBackground(weatherCondition) {
  const body = document.body;

  switch (weatherCondition) {
    case 'haze':
      body.style.backgroundImage = 'url("haze.webp")';
      break;
    case 'clouds':
      body.style.backgroundImage = 'url("cloudy.jpg")'; 
      break;
    case 'rain':
      body.style.backgroundImage = 'url("rainy2.jpg")'; 
      break;
    case 'snow':
      body.style.backgroundImage = 'url("snowy.jpg")'; 
      break;
      case 'drizzle':
      body.style.backgroundImage = 'url("drizzle.jpg")'; 
      break;
      case 'clear':
      body.style.backgroundImage = 'url("clear.jpg")'; 
      break;
      case 'sunny':
      body.style.backgroundImage = 'url("sunny.webp")'; 
      break;
      case 'thunderstorm':
      body.style.backgroundImage = 'url("thunderstorm.jpg")'; 
      break;
      case 'fog':
      body.style.backgroundImage = 'url("fog.jpg")'; 
      break;
    default:
      body.style.backgroundColor = '#fff'; 
  }
}
