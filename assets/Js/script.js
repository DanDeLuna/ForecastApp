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