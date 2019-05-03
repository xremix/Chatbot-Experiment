var express = require('express');
var telegram = require('./telegram');
var app = express();

const dotenv = require('dotenv');
dotenv.config();
var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
  res.send('Bot Service is up!');
});
app.get('/test', function (req, res) {
  telegram.getUpdates(process.env.TOKEN, function(){
    res.send('Done');
  });
});
app.get('/init', function (req, res) {
  res.send('Initialized Service with Telegram!');
});

app.get('/recievemessage', function (req, res) {
  telegram.getUpdates(process.env.TOKEN, process.env.WEBHOOKURL, function(){
    res.send('Done');
  });

});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
  console.log(process.env.TEST);
});
