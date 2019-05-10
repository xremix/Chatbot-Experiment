var request = require('request');
// https://github.com/request/request
// https://core.telegram.org/bots/api


exports.getUpdates = function (token, callback) {
  var reqUrl = 'https://api.telegram.org/bot'+token+'/getUpdates?offset=5';
  // console.log('sending request to ' + reqUrl);
  request(reqUrl, function (error, response, body) {
    // console.error('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    callback && callback(response, body);
  });
};
exports.sendMessage = function (token, id, text, callback) {
  var reqUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${encodeURI(text)}`;
  // console.log('sending request to ' + reqUrl);
  request(reqUrl, function (error, response, body) {
    // console.error('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    callback && callback(response, body);
  });
};
exports.sendLocation = function (token, id,  lat, long, callback) {
  var reqUrl = `https://api.telegram.org/bot${token}/sendLocation?chat_id=${id}&latitude=${lat}&longitude=${long}`;
  // console.log('sending request to ' + reqUrl);
  request(reqUrl, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    callback && callback(response, body);
  });
};

exports.setWebhook = function (token, url, callback) {
  var reqUrl = 'https://api.telegram.org/bot'+token+'/setWebhook?url=' + encodeURI(url);
  // console.log('sending request to ' + reqUrl);
  request(reqUrl, function (error, response, body) {
    // console.error('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    callback && callback(response, body);
  });
};
