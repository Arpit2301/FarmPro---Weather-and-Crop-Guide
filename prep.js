let weather = {
    "apikey": "285c037e2c52620f47e56f724ed4e967",
    fetchw: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=285c037e2c52620f47e56f724ed4e967&units=metric")
            .then((response) => response.json())
            .then((data) => this.displayw(data));
    },
    displayw: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);

        document.querySelector(".place").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".details").innerText = description;
        document.querySelector(".windspeed").innerText = " Wind Speed: " + speed + " Km/hr";
        document.querySelector(".humidity").innerText = " Humidity: " + humidity + "%";
        document.querySelector(".temp").innerText = temp.toFixed(2) + "° C";
        
        // Crop and Disaster Recommendations
        const cropAdvice = {
            'Clear': 'You can grow wheat, corn, or barley.',
            'Clouds': 'Suitable for growing potatoes and beans.',
            'Rain': 'Consider planting rice or leafy greens.',
            'Thunderstorm': 'Harvest existing crops to avoid damage.',
            'Snow': 'Not suitable for farming. Protect your crops.',
            'Extreme': 'Potential disaster! Take precautions.'
        };
        
        const advice = cropAdvice[description] || 'No specific advice available.';
        document.querySelector(".details").innerHTML += `<p>${advice}</p>`;
        
        if (description.includes("Thunderstorm") || description.includes("Extreme")) {
            document.querySelector(".container").style.backgroundColor = "red";
        } else {
            document.querySelector(".container").style.backgroundColor = "#000000d0";
        }
    },
    search: function () {
        this.fetchw(document.querySelector(".sbar").value);
    }
};

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    weather.search();
});

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

