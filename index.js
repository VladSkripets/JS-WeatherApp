const api = '00864a650abc70390dd769b2c6565a8e';
const btn = document.querySelector('.btn');

window.addEventListener('load', () => {
    getDate();
})

const getDate = () => {
    let date = document.querySelector('.date');
    const today = new Date();
    const options = {
        weekday : 'long',
        month : 'short',
        day : 'numeric'
    }

    date.textContent = today.toLocaleDateString('en-UK', options);
}

const errorMessage = () => {
    let icon = document.querySelector('.weather-icon');
    let city = document.querySelector('.city');
    let temp = document.querySelector('.temp span');
    let weather = document.querySelector('.weather span');
    let tempRange = document.querySelector('.temp-range span');
    let error = document.querySelector('.error');

    icon.src = '';
    city.textContent = '';
    temp.textContent = '';
    weather.textContent = '';
    tempRange.textContent = ''
    error.textContent = 'Please enter a valid city!';
}

btn.addEventListener('click', () => {
    let city = document.querySelector('.search').value;
    getWeather(city, api).then(data => data !== false ? getData(data) : errorMessage())

})

const getData = (data) => {
    let icon = document.querySelector('.weather-icon');
    let city = document.querySelector('.city');
    let temp = document.querySelector('.temp span');
    let weather = document.querySelector('.weather span');
    let tempRange = document.querySelector('.temp-range span');
    let error = document.querySelector('.error');
    error.textContent = '';

    icon.src = `http://openweathermap.org/img/wn/${data.weather_data.icon}.png`;
    city.textContent = `${data.city}, ${data.country}`;
    temp.textContent = Math.round(data.current_temp);
    weather.textContent = `${data.weather_data.description.charAt(0).toUpperCase() + data.weather_data.description.slice(1)}`;
    tempRange.textContent = `${Math.round(data.min_temp)} °C / ${Math.round(data.max_temp)} °C`
}


const weatherData = obj => {
    return {
        current_temp : obj.main.temp,
        min_temp : obj.main.temp_min,
        max_temp : obj.main.temp_max,
        city : obj.name,
        country : obj.sys.country,
        weather_data : {
            description : obj.weather[0].description,
            icon : obj.weather[0].icon
        }
    }
}

async function getWeather(city, api_key) {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return weatherData(data)
    } catch {
        return false
    }
}