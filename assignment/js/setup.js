// Leaflet map setup
var map = L.map('map', {
  center: [39.50, -98.35],
  zoom: 4
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

// The viz.json output by publishing on cartodb
var layerUrl = 'https://pherman09.cartodb.com/api/v2/viz/e3d4bcd6-fb3a-11e5-9d8c-0ecfd53eb7d3/viz.json';

var IncLayer;
// Use of CartoDB.js
cartodb.createLayer(map, layerUrl)
  .addTo(map)
  .on('done', function(layer) {
    // layer is a cartodb.js Layer object - can call getSubLayer on it!
    IncLayer = layer.getSubLayer(0);
    IncLayer.on('featureClick',function(a,b,c,d){
      var countyID = d.cartodb_id;
      var sql = "SELECT * FROM counties_with_income_normalized_by_state_income WHERE cartodb_id="+ countyID;
      $.ajax('https://pherman09.cartodb.com/api/v2/sql/?q=' + sql).done(function(results) {
        var countyString = results.rows[0].namelsad + ", ";
        $("#countyClicked").append(countyString);
      });
    });
    // console.log(layer);
  }).on('error', function(err) {
    // console.log(err):
  });
