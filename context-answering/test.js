var db = require('./database');
var contextBuilder = require('./contextBuilder');
var answerFinder = require('./answerFinder');


console.log(answerFinder.addToContext(db, 99, "Hallo"));
console.log(contextBuilder.findAnswerFromContext(db, 99));
console.log("");

console.log(answerFinder.addToContext(db, 99, "Wie geht es dir so?"));
console.log(contextBuilder.findAnswerFromContext(db, 99));
console.log("");

console.log(db.getContext(99));


console.log(answerFinder.addToContext(db, 99, "Ich habe eine Frage Frage zu einem Produkt"));
console.log(contextBuilder.findAnswerFromContext(db, 99));
console.log("");

console.log(answerFinder.addToContext(db, 99, "Es geht um PR-123"));
console.log(contextBuilder.findAnswerFromContext(db, 99));
console.log("");

console.log(answerFinder.addToContext(db, 99, "Wie viel kostet das Produkt?"));
console.log(contextBuilder.findAnswerFromContext(db, 99));
console.log("");

console.log(answerFinder.addToContext(db, 99, "Bla blub"));
console.log(contextBuilder.findAnswerFromContext(db, 99));
console.log("");

console.log(answerFinder.addToContext(db, 99, "Experte büdde"));
console.log(contextBuilder.findAnswerFromContext(db, 99));
console.log("");

console.log(answerFinder.addToContext(db, 99, "Kennst Du Toni?"));
console.log(contextBuilder.findAnswerFromContext(db, 99));
console.log("");

console.log(answerFinder.addToContext(db, 99, "Kann ich mit jemanden echten telefonieren?"));
console.log(contextBuilder.findAnswerFromContext(db, 99));
console.log("");
