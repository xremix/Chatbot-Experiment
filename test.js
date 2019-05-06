
var messageResolver = require('./questioning/message-resolver');
var database = require('./questioning/database');




// console.log(messageResolver.findAnswer("Wie viel kostet des Produkt PR-12312?"));
// console.log("---");
// console.log(messageResolver.findAnswer("Kennst Du den Andi?"));
// console.log("---");
console.log(messageResolver.findAnswer("Ich habe eine Frage zu einem ihrer Produkte"));
console.log("---");
console.log(messageResolver.findAnswer("Es geht um das Produkt PR-12312, könnte ich dazu ein paar Informationen haben?"));
console.log("---");
