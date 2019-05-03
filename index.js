var express = require('express');
var bodyParser = require('body-parser');
var telegram = require('./telegram');
var messageReciever = require('./message-reciever');
var app = express();

app.use(bodyParser.json()); // for parsing application/json

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

app.post('/recievemessage', function (req, res) {
  console.log(req.body);
  var userMessage = req.body.message.text;
  var userId = req.body.message.from.id;
  var replyMessage = messageReciever.getReply(userMessage);

  telegram.sendMessage(process.env.TOKEN, userId, replyMessage, function(){
    res.send(replyMessage);  
  });

});

// app.get('/readMessages', function (req, res) {
//   telegram.getUpdates(process.env.TOKEN, process.env.WEBHOOKURL, function(){
//     res.send('Done');
//   });
// });

app.listen(port, function () {
  console.log('Service listening on http://localhost:' + port);
});
