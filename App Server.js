document.querySelector(".City-Search-Button").addEventListener("click",function () {
    details_weather.weather_search();
})

document.getElementById("City")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("Button").click();
        this.gethWeatherDetails(document.querySelector(".Search-Location").value);
    }
});

var details_weather = {
    
    "APIkey" : "f8112631d50859c3bcff8cbf33a55b39",
    gethWeatherDetails : function (cityname){
         fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=metric&appid=" + this.APIkey)
         .then((Response) => Response.json())
         .then((data) => this.displayWeatherDetails(data));
    },

    displayWeatherDetails : function (data) {
        const {name} = data;
        const {country} = data.sys;
        const {temp} = data.main;
        const {icon} = data.weather[0];
        const {description} = data.weather[0];
        
        const {sunrise} = data.sys;
        const {sunset} = data.sys;  

        const {pressure} = data.main;
        const {visibility} = data;

        const {humidity} = data.main;
        const {speed} = data.wind;

        var date_conversion1 = new Date(sunrise * 1000);
        var timestr1 = date_conversion1.toLocaleTimeString();

        var date_conversion2 = new Date(sunset * 1000);
        var timestr2 = date_conversion2.toLocaleTimeString();

        $(".City-Country-Display").html(name + "," + country);
        $(".Temperature-Display").html(temp + " °C");

        document.querySelector(".Icon-Weather").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        $(".Weather-Description").html(description);

        $(".Sunrise").html("Sunrise - " + timestr1 + " (IST)");
        $(".Sunset").html("Sunset - " + timestr2 + " (IST)");

        $(".Pressure").html("Atmospheric Pressure - " + pressure + " hPa");
        $(".Visibility").html("Visibility - " + (visibility/1000) + " km");

        $(".Humidity-Display").html("Humidity - " + humidity + " %");
        $(".Wind-Display").html("Wind Speed - " + speed + " m/s");

     
    },

    weather_search : function () {
        this.gethWeatherDetails(document.querySelector(".Search-Location").value);
    }

};