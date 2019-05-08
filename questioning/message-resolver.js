var database = require('./database');

exports.getReply = function(body) {
  var userMessage = body.message.text;
  var userId = body.message.from.id;

  var answer = findcorrectAnswer(userMessage, navigateToCurrentQuestion(userId), userId);
  // Fallback to default questions
  if(!answer){
    console.log("Trying to find answer through fallback");
    var startQuestions = require('./question-graph').questionGraph;
    answer = findcorrectAnswer(userMessage, startQuestions, userId);
  }

  return answer;
};

function findcorrectAnswer(usersQuestion, questions, userId){
  for (var i = 0; i < questions.length; i++) {
    if(questions[i].pattern(usersQuestion)){
      if(!questions[i].questions.length){
        database.clearUserPath(userId);
      }else{
        database.appendUserPath(userId, i);
      }
      return questions[i].template(usersQuestion);
    }
  }

  database.clearUserPath(userId);
}

function navigateToCurrentQuestion(userId){
  var questionsToFind = require('./question-graph').questionGraph;

  var userPath = database.getUserPath(userId);
  while(userPath.length){
    questionsToFind = questionsToFind[userPath.pop()].questions;
  }
  return questionsToFind;
}
