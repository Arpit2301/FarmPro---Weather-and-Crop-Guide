let weather = {
    "apikey": "285c037e2c52620f47e56f724ed4e967",
    fetchw: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apikey + "&units=metric")
            .then((response) => response.json())
            .then((data) => this.displayw(data));
    },
    displayw: function (data) {
        const { name } = data;
        const { icon, description, main } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".place").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".details").innerText = description;
        document.querySelector(".windspeed").innerText = " Wind Speed: " + speed + " Km/hr";
        document.querySelector(".humidity").innerText = " Humidity: " + humidity + "%";
        document.querySelector(".temp").innerText = temp.toFixed(2) + "° C";

        // Background Change based on Weather Condition
        const weatherBackgrounds = {
            'Clear': 'url("https://source.unsplash.com/1600x900/?sunny,clear")',
            'Clouds': 'url("https://source.unsplash.com/1600x900/?cloudy,sky")',
            'Rain': 'url("https://source.unsplash.com/1600x900/?rain,storm")',
            'Thunderstorm': 'url("https://source.unsplash.com/1600x900/?lightning,thunderstorm")',
            'Snow': 'url("https://source.unsplash.com/1600x900/?snow,winter")',
            'Mist': 'url("https://source.unsplash.com/1600x900/?fog,mist")',
            'Haze': 'url("https://source.unsplash.com/1600x900/?haze,smog")',
            'Extreme': 'url("https://source.unsplash.com/1600x900/?storm,danger")'
        };

        // Crop Recommendations Based on Weather
        const cropSuggestions = {
            'Clear': {
                crop: 'Wheat, Corn, Barley',
                tips: 'Irrigate moderately, use organic fertilizers, and monitor soil health.'
            },
            'Clouds': {
                crop: 'Potatoes, Beans, Spinach',
                tips: 'Ensure good drainage, reduce water usage, and apply nitrogen-rich fertilizers.'
            },
            'Rain': {
                crop: 'Rice, Sugarcane, Maize',
                tips: 'Prevent waterlogging, use raised beds, and apply fungicides to avoid mold.'
            },
            'Thunderstorm': {
                crop: 'Avoid new plantation',
                tips: 'Harvest mature crops, use windbreaks, and secure greenhouses.'
            },
            'Snow': {
                crop: 'Not suitable for farming',
                tips: 'Protect crops in greenhouses, use mulch for insulation, and delay planting.'
            },
            'Mist': {
                crop: 'Tea, Coffee, Apples',
                tips: 'Ensure proper aeration, prune regularly, and prevent fungal infections.'
            },
            'Haze': {
                crop: 'Millets, Sorghum, Mustard',
                tips: 'Reduce air pollution exposure, wash leaves frequently, and increase watering.'
            },
            'Extreme': {
                crop: 'High risk! Avoid farming',
                tips: 'Take safety precautions, move plants indoors, and secure farm structures.'
            }
        };

        // Set the background image based on the weather condition
        document.body.style.backgroundImage = weatherBackgrounds[main] || 'url("https://source.unsplash.com/1600x900/?weather")';

        // Display crop recommendations
        let cropInfo = cropSuggestions[main] || { crop: 'No specific advice available.', tips: '' };
        document.querySelector(".details").innerHTML += `<p><strong>Best Crops:</strong> ${cropInfo.crop}</p><p><strong>Tips:</strong> ${cropInfo.tips}</p>`;
    },
    search: function () {
        this.fetchw(document.querySelector(".sbar").value);
    }
};

// Event Listeners for Search
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    weather.search();
});

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});
