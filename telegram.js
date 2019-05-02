var request = require('request');
// https://github.com/request/request

exports.setWebhook = function () {
  return Date();
};
exports.getUpdates = function (token, callback) {
  request('https://api.telegram.org/bot'+token+'/getUpdates?offset=5', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    callback();
  });
};

exports.setWebhook = function (token, url, callback) {
  request('https://api.telegram.org/bot'+token+'/setWebhook?url=' + url, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    callback();
  });
};
