const express = require('express');
const app = express();
console.log(__dirname);
var weather = require('weather-js');

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
  res.render('other');
});

app.use((req,res) => {
  res.render('404');
});

app.listen(3000);