var db = require('./database');
var contextFinder = require('./context-finder');
var contextAnswerer = require('./context-answerer');


console.log(contextFinder.addToContext(db, 99, "Hallo"));
console.log(contextAnswerer.findAnswerFromContext(db, 99));
console.log("");

console.log(contextFinder.addToContext(db, 99, "Wie geht es dir so?"));
console.log(contextAnswerer.findAnswerFromContext(db, 99));
console.log("");

console.log(db.getContext(99));


console.log(contextFinder.addToContext(db, 99, "Ich habe eine Frage Frage zu einem Produkt"));
console.log(contextAnswerer.findAnswerFromContext(db, 99));
console.log("");

console.log(contextFinder.addToContext(db, 99, "Es geht um PR-123"));
console.log(contextAnswerer.findAnswerFromContext(db, 99));
console.log("");

console.log(contextFinder.addToContext(db, 99, "Wie viel kostet das Produkt?"));
console.log(contextAnswerer.findAnswerFromContext(db, 99));
console.log("");

console.log(contextFinder.addToContext(db, 99, "Bla blub"));
console.log(contextAnswerer.findAnswerFromContext(db, 99));
console.log("");

console.log(contextFinder.addToContext(db, 99, "Experte büdde"));
console.log(contextAnswerer.findAnswerFromContext(db, 99));
console.log("");

console.log(contextFinder.addToContext(db, 99, "Kennst Du Toni?"));
console.log(contextAnswerer.findAnswerFromContext(db, 99));
console.log("");

console.log(contextFinder.addToContext(db, 99, "Kann ich mit jemanden echten telefonieren?"));
console.log(contextAnswerer.findAnswerFromContext(db, 99));
console.log("");
