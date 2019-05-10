var express = require('express');
var bodyParser = require('body-parser');
var telegram = require('./telegram');

var db = require('./context-answering/database');
var contextFinder = require('./context-answering/context-finder');
var contextAnswerer = require('./context-answering/context-answerer');

var app = express();

app.use(bodyParser.json()); // for parsing application/json

const dotenv = require('dotenv');
dotenv.config();
var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
  console.log("Got a / request");
  res.send('Bot Service is up! You are seeing version v' + db.version);
});

app.get('/test', function (req, res) {
  console.log("Got a /test request");
  telegram.getUpdates(process.env.TOKEN, function(){
    res.send('Done');
  });
});

app.get('/init', function (req, res) {
  console.log("Got a /init request");
  telegram.setWebhook(process.env.TOKEN, process.env.WEBHOOKURL, function(response, body){
    res.send(body);
  });
});

app.post('/recievemessage', function (req, res) {
  console.log("Got a /recievemessage post request");
  // console.log(req.body);
  var userMessage = req.body.message.text;
  var userId = req.body.message.from.id;

  contextFinder.addToContext(db, userId, userMessage);
  var replyMessage = contextAnswerer.findAnswerFromContext(db, userId);

  telegram.sendMessage(process.env.TOKEN, userId, replyMessage, function(){
    res.send(replyMessage);
  });

});

app.listen(port, function () {
  console.log('Service listening on http://localhost:' + port);
});
