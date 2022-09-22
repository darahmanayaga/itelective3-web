const express = require('express');
const app = express();
console.log(__dirname);

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