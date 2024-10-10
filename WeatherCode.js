const apiLinkStart = "https://api.openweathermap.org/data/2.5/weather?q="
const apiLinkEnd = "&units=metric&appid=f56be2a520dda2b6f2e0047e4e08966f"
const geoAPIStart = "https://api.openweathermap.org/geo/1.0/direct?q="
const geoAPIEnd = "&limit=3&appid=f56be2a520dda2b6f2e0047e4e08966f"
const forecastAPIStart = "https://api.openweathermap.org/data/2.5/forecast?lat="
const forecastAPIEnd = "&appid=f56be2a520dda2b6f2e0047e4e08966f&units=metric"
            
function convert(input, value) {
    let time = moment(input, 'HH');
    time = time.subtract(value, 'hours');
    return time.format('h A');
}

async function getWeather(city) {
    const response = await fetch(apiLinkStart + city + apiLinkEnd);
    var data = await response.json();
    console.log(data);

    const locationResponse = await fetch(geoAPIStart + city + geoAPIEnd)
    var locationData = await locationResponse.json();
    console.log(locationData);

    const forecastResponse = await fetch(forecastAPIStart + locationData[0].lat + "&lon=" + locationData[0].lon + forecastAPIEnd)
    var forecastData = await forecastResponse.json();
    console.log(forecastData);

    var threehrstime = convert(forecastData.list[0].dt_txt.substring(11, 13), 5);
    var sixhrstime = convert(forecastData.list[1].dt_txt.substring(11, 13), 5);
    var ninehrstime = convert(forecastData.list[2].dt_txt.substring(11, 13), 5);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".description").innerHTML = data.weather[0].main;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "% Humidity";
    document.querySelector(".threehrs").innerHTML = threehrstime;
    document.querySelector(".sixhrs").innerHTML = sixhrstime;
    document.querySelector(".ninehrs").innerHTML = ninehrstime;
    document.querySelector(".threehrsw").innerHTML = Math.round(forecastData.list[0].main.temp) + "°c " + forecastData.list[0].weather[0].main;
    document.querySelector(".sixhrsw").innerHTML = Math.round(forecastData.list[1].main.temp) + "°c " + forecastData.list[1].weather[0].main;
    document.querySelector(".ninehrsw").innerHTML = Math.round(forecastData.list[2].main.temp) + "°c " + forecastData.list[2].weather[0].main;

    switch (data.weather[0].main) {
        case "Clear":
            const time = new Date();
            var currentTime = convert(time.getHours(), 0);
            if ((currentTime.substring(0, 2) >= 8 && currentTime.search("PM") != -1) || (currentTime.substring(0, 2) <= 6 && currentTime.search("AM") != -1)) {
                backgroundImage.src = "images/nightBG.png";
                imageIcon.src = "images/nightClear.png";
            } else {
                imageIcon.src = "images/clear.png";
                backgroundImage.src = "images/sunnyBG.png";
            }
            break;
        case "Rain":
            imageIcon.src = "images/rainy.png";
            backgroundImage.src = "images/rainBG.png";
            break;
        case "Clouds":
            imageIcon.src = "images/cloudy.png";
            backgroundImage.src = "images/cloudyBG.png";
            break;
        case "Thunderstorm":
            imageIcon.src = "images/thunderstorm.png";
            backgroundImage.src = "images/thunderstormBG.png";
            break;
        case "Drizzle":
            imageIcon.src = "images/drizzle.png";
            backgroundImage.src = "images/drizzleBG.png";
            break;
        case "Snow":
            imageIcon.src = "images/snow.png";
            backgroundImage.src = "images/snowBG.png";
            break;
    }

    const time = new Date();
    var currentTime = convert(time.getHours(), 0);

    switch (currentTime) {
        case currentTime.substring(0, 1) > 8 & currentTime.substring(2, 3) == "PM":
            backgroundImage.src = "images/nightBG.png";
    }
}