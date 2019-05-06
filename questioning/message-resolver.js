var answers = require('./answers');
var database = require('./database');

exports.getReply = function(body) {
  var userMessage = body.message.text;
  var userId = body.message.from.id;
  
  return findcorrectAnswer(userMessage, navigateToCurrentQuestion());
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

function navigateToCurrentQuestion(){
  var questionsToFind = require('./question-graph').questionGraph;

  var userPath = database.getUserPath();
  while(userPath.length){
    questionsToFind = questionsToFind[userPath.pop()].questions;
  }
  return questionsToFind;
}
