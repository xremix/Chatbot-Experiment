var db = require('../db/contextStorage');
var contextAssembler = require('../contextAnswerGraph/contextAssembler');
var responseSearchTree = require('../contextAnswerGraph/responseSearchTree');


console.log(responseSearchTree.addToContext(db, 99, "Hallo"));
console.log(contextAssembler.findAnswerFromContext(db, 99));
console.log("");

console.log(responseSearchTree.addToContext(db, 99, "Wie geht es dir so?"));
console.log(contextAssembler.findAnswerFromContext(db, 99));
console.log("");

console.log(db.getContext(99));


console.log(responseSearchTree.addToContext(db, 99, "Ich habe eine Frage Frage zu einem Produkt"));
console.log(contextAssembler.findAnswerFromContext(db, 99));
console.log("");

console.log(responseSearchTree.addToContext(db, 99, "Es geht um PR-123"));
console.log(contextAssembler.findAnswerFromContext(db, 99));
console.log("");

console.log(responseSearchTree.addToContext(db, 99, "Wie viel kostet das Produkt?"));
console.log(contextAssembler.findAnswerFromContext(db, 99));
console.log("");

console.log(responseSearchTree.addToContext(db, 99, "Bla blub"));
console.log(contextAssembler.findAnswerFromContext(db, 99));
console.log("");

console.log(responseSearchTree.addToContext(db, 99, "Experte büdde"));
console.log(contextAssembler.findAnswerFromContext(db, 99));
console.log("");

console.log(responseSearchTree.addToContext(db, 99, "Kennst Du Toni?"));
console.log(contextAssembler.findAnswerFromContext(db, 99));
console.log("");

console.log(responseSearchTree.addToContext(db, 99, "Kann ich mit jemanden echten telefonieren?"));
console.log(contextAssembler.findAnswerFromContext(db, 99));
console.log("");
