var answers = require('./answers');
var database = require('./database');

exports.getReply = function(body) {
  var userMessage = body.message.text;
  var userId = body.message.from.id;

  if (customerMessage.match(/(PR-[0-9]+)/i)){
    var product = customerMessage.match(/(PR-[0-9]+)/i)[0];
    if(customerMessage.match(/(wie|viel|kostet|kosten|preis)/i)){

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
