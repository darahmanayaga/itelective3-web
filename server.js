const express = require('express');
const app = express();
console.log(__dirname);
var weather = require('weather-js');
 
weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) {
  if(err) console.log(err);
 
  console.log(JSON.stringify(result, null, 2));
});

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/other', function (req, res) {
  res.render('other');
});

app.use((req,res) => {
  res.render('404');
});

app.listen(3000);