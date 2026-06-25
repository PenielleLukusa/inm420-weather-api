// Replace with your actual key from weatherapi.com
const API_KEY = '968ca585ef62473d83643409262506'; 
const btn = document.getElementById('getWeatherBtn');
const citySelect = document.getElementById('citySelect');
const resultDiv = document.getElementById('weatherResult');

// DOM elements to update
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temperature');
const condition = document.getElementById('condition');
const icon = document.getElementById('weatherIcon');

btn.addEventListener('click', getWeather);

async function getWeather() {
  const city = citySelect.value;
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    
    const data = await response.json();
    
    // DOM Manipulation - this is what gets you marks
    cityName.textContent = data.location.name;
    temp.textContent = `Temperature: ${data.current.temp_c}°C`;
    condition.textContent = `Condition: ${data.current.condition.text}`;
    icon.src = `https:${data.current.condition.icon}`;
    icon.alt = data.current.condition.text;
    
    resultDiv.classList.remove('hidden'); // show results
    
  } catch (error) {
    alert('Error: ' + error.message);
    resultDiv.classList.add('hidden');
  }
}