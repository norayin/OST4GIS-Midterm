/* =====================
Setup Map
===================== */
var map = L.map('map', {
  center: [40.000, -75.16],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
Import Data
===================== */
// Farmers market data
// Modified using geojson.io
var dataset = "https://raw.githubusercontent.com/norayin/CPLN692-Midterm/master/Farmers_Markets_Modified.geojson";
var parsedData;
var featureGroup;
$.ajax(dataset).done(function(data){
  parsedData = JSON.parse(data);
});

// Add philly boundary
var phillyBoundary = "https://gist.githubusercontent.com/anonymous/eb5a6386acba87e14f8f4262cb4d0488/raw/7d073e2bab2e0a2cb55e1b19e0b9439bc833c886/boundary.json";
var boundary;
$.ajax(phillyBoundary).done(function(data){
  boundary = JSON.parse(data);
});

// Sey default slide number
var slideNumber = 0;

/* =====================
Call functions
===================== */
$(document).ready(function() {
  $.ajax(phillyBoundary).done(function(data) {
    boundary = JSON.parse(data);
    defaultPage();
    // First plot philly boundary then plot markers - crucial for layer order
    $.ajax(dataset).done(function(data) {
      parsedData = JSON.parse(data);
      // Set up initial slide
      slideNumber = 0;
      $('#button-previous').hide();
      $('#button-next').show();
      setView();
      plotMarker();
      showSlide();
      // Ready to click buttons
      clickButton();
    });
  });
});
