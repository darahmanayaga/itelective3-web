const express = require('express');
const app = express();
console.log(__dirname);
var weather = require('weather-js');
var fetchUrl = require("fetch").fetchUrl;

app.set('view engine', 'ejs');

app.get('/', function (req, res) {

  weather.find({search: 'Davao City, PH', degreeType: 'C'}, function(err, result) {
    var weather_data = null;
    if(err) console.log(concat(err));
    else{
        weather_data = result;

    };
    res.render('index', { weather: weather_data });
  });

});


app.get('/other', function (req, res) {
  // http://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

  fetchUrl("https://api.thecatapi.com/v1/breeds", function(error, meta, body) {
    var cats = JSON.parse(body);
    var data = {
      url: req.url,
      itemData: cats
    }
    res.render('other', data);
  });

});


app.use((req,res) => {
  res.render('404');
});

app.listen(3000);