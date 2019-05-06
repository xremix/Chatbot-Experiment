
var messageResolver = require('./questioning/message-resolver');
var database = require('./questioning/database');




console.log(messageResolver.findAnswer("I got a question for a product"));
console.log('----------')
console.log('----------')
console.log('----------')
console.log('----------')
console.log(messageResolver.findAnswer("I mean product PR-12312, do you have some information?"));
