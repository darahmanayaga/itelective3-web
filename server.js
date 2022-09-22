const express = require('express');
const app = express();
console.log(__dirname);

app.get('/', function (req, res) {
  res.sendFile('/views/index.html', {root: __dirname});
});

app.listen(3000);