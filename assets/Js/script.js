$(window).on('load', function () {
    currentLocation();
    checkLocalStorage();
});
// API Key
var APIKey = "b29bfa124a68dd6b7245343a1bd4ecbb";
var q = "";
var now = moment();
//Date and time 
var currentDate = now.format('MMMM Do YYYY || h:mm a');
$("#currentDay").text(currentDate);

//Setting the click function at ID search button
$("#search-button").on("click", function (event) {
    event.preventDefault();
    q = $("#city-input").val();
    if (q === '') {
        return alert('Please Enter Valid City Name ! ');
    }
    getWeather(q);
    saveToLocalStorage(q);
});
// create Button for search city 
function createRecentSearchBtn(q) {
    var newLi = $("<li>")
    var newBtn = $('<button>');
    newBtn.attr('id', 'extraBtn');
    newBtn.addClass("button is-small recentSearch");
    newBtn.text(q);
    newLi.append(newBtn)
    $("#historyList").prepend(newLi);
    $("#extraBtn").on("click", function () {
        var newQ = $(this).text();
        getWeather(newQ);
    });
}
//converting temperature F to Celsius 
function convertToC(fahrenheit) {
    var fTempVal = fahrenheit;
    var cTempVal = (fTempVal - 32) * (5 / 9);
    var celcius = Math.round(cTempVal * 10) / 10;
    return celcius;
  }
  //Function to get weather details 
function getWeather(q) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET",
        error: (err => {  
            alert("Your city was not found. Check your spelling or enter a city code")
            return;
          })
    }).then(function (response) {
        console.log(response)
        $(".cityList").empty()
        $("#days").empty()
        var celcius = convertToC(response.main.temp);
        var cityMain1 = $("<div col-12>").append($("<p><h2>" + response.name + ' (' + currentDate + ')' + "</h2><p>"));
        var image = $('<img class="imgsize">').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');        
        var degreeMain = $('<p>').text('Temperature : ' + response.main.temp + ' °F (' + celcius + '°C)');
        var humidityMain = $('<p>').text('Humidity : ' + response.main.humidity + '%');
        var windMain = $('<p>').text('Wind Speed : ' + response.wind.speed + 'MPH');       
        var uvIndexcoord = '&lat=' + response.coord.lat + '&lon=' + response.coord.lon;
        var cityId = response.id;

        displayUVindex(uvIndexcoord);
        displayForecast(cityId);

        cityMain1.append(image).append(degreeMain).append(humidityMain).append(windMain);
        $('#cityList').empty();
        $('#cityList').append(cityMain1);
    });
}
function displayUVindex(uv) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + uv,
        method: "GET"
    }).then(function (response) {
        var UVIndex = $("<p><span>");
        UVIndex.attr("class", "badge badge-danger");
        UVIndex.text(response.value);
        $("#cityList").append('UV-Index : ').append(UVIndex);       
    });
}