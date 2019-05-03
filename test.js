
var messageReciever = require('./message-reciever');

console.log(messageReciever.getReply("Hallo"));
console.log(messageReciever.getReply("Was kostet das Produkt PR-1337"));
console.log(messageReciever.getReply("Ist der Preis von PR-1337 hoch?"));
console.log(messageReciever.getReply("Was ist das Produkt PR-1337?"));
// console.log(messageReciever.getReply("Was kann ich Dich fragen?"));
