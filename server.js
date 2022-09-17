const express = require('express');
const app = express();
var weather = require('weather-js');

 
weather.find({search: 'Davao City, PH', degreeType: 'C'}, function(err, result) {
  if(err) console.log(err);
 
  console.log(JSON.stringify(result, null, 2));
});

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>')
})

app.listen(3000);