$(window).on('load', function () {
    currentLocation();
    checkLocalStorage();
});
// API Key for all weather data 
var APIKey = "b29bfa124a68dd6b7245343a1bd4ecbb";
var q = "";
var now = moment();
//Date and time formate for header
var currentDate = now.format('MMMM Do YYYY || h:mm a');
$("#currentDay").text(currentDate);