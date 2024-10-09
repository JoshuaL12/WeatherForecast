const apiLinkStart = "https://api.openweathermap.org/data/2.5/weather?q="
const apiLinkEnd = "&units=metric&appid=0535ce365245782fe142ebad990d71b7"
const geoAPIStart = "https://api.openweathermap.org/geo/1.0/direct?q="
const geoAPIEnd = "&limit=3&appid=0535ce365245782fe142ebad990d71b7"
const forecastAPIStart = "https://api.openweathermap.org/data/2.5/forecast?lat="
const forecastAPIEnd = "&appid=0535ce365245782fe142ebad990d71b7&units=metric"
            
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
            imageIcon.src = "images/clear.png";
            backgroundImage.src = "images/sunnyBG.png";
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
}