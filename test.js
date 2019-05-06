var messageResolver = require('./questioning/message-resolver');
var database = require('./questioning/database');



console.log(messageResolver.findAnswer("Hallo, wie geht es Dir?"));
console.log("---");
console.log(messageResolver.findAnswer("Ich habe eine Frage zu einem ihrer Produkte"));
console.log("---");
console.log(messageResolver.findAnswer("Es geht um das Produkt PR-12312, könnte ich dazu ein paar Informationen haben?"));
console.log("---");
