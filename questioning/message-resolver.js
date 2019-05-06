var answers = require('./answers');
var database = require('./database');

// var database = {
//   customerData: {},
//   openQuestions: { }
// };

exports.getReply = function(body) {
  var userMessage = body.message.text;
  var userId = body.message.from.id;

  // if (hasOpenQuestion(customerId)){
  //   if(answerQuestion(customerId, customerMessage)){
  //     return answers.thanksForAnswer();
  //   }
  // }
  if (customerMessage.match(/(PR-[0-9]+)/i)){
    var product = customerMessage.match(/(PR-[0-9]+)/i)[0];
    if(customerMessage.match(/(wie|viel|kostet|kosten|preis)/i)){
      // if(isCustomer(customerId) == null){
      //   return answers.askIfCustomer(customerId);
      // }
      return answers.productPriceMessage(product, isCustomer(customerId));
    } else {
      return answers.productInformationMessage(product);
    }
  } else if(customerMessage.match(/(hallo|hi|hey)/i)) {
    return answers.randomHello();
  } else if(customerMessage.match(/(danke)/i)) {
    return answers.randomThankyou();
  } else {
    return answers.helpMessage();
  }
};


// function answerQuestion(customerId, customerMessage){
//   if(database.openQuestions[customerId] == 'isCustomer'){
//     database.openQuestions[customerId] = null;
//     if(!database.customerData[customerId]){
//       database.customerData[customerId] = {};
//     }
//     if (customerMessage.match(/(ja|jop|yes)/i)){
//       database.customerData[customerId].isCustomer = true;
//     }else{
//       database.customerData[customerId].isCustomer = false;
//     }
//   }
// }

// function hasOpenQuestion(customerId){
//   return !!database.openQuestions[customerId];
// }
//
//
// function isCustomer(customerId){
//   if(database.customerData[customerId] === undefined || database.customerData[customerId] == null ||  database.customerData[customerId].isCustomer === undefined || database.customerData[customerId].isCustomer === null){
//     return null;
//   }
//   return database.customerData[customerId];
// }



function findcorrectAnswer(usersQuestion, questions){
  for (var i = 0; i < questions.length; i++) {
    if(questions[i].isAnswerTo(usersQuestion)){
      if(!questions[i].questions.length){
        database.clearUserPath();
      }else{
        database.appendUserPath(i);
      }
      return questions[i].answerText(usersQuestion);
    }
  }

  database.clearUserPath();
  // return {
  //   answerText: "I don't know what you mean",
  //   isAnswerTo: function(q){return true},
  //   questions: null,
  //   // path: pathToReturnToTheUser
  // };
  return answers.helpMessage();
}

exports.findAnswer = function(currentQuestion){
  var contextQuestions = navigateToCurrentQuestion();
  return findcorrectAnswer(currentQuestion, contextQuestions);
}

function navigateToCurrentQuestion(){
  var questionsToFind = require('./question-graph').questionGraph;

  var userPath = database.getUserPath();
  while(userPath.length){
    questionsToFind = questionsToFind[userPath.pop()].questions;
  }
  return questionsToFind;
}
