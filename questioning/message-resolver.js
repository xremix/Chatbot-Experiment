var database = require('./database');

exports.getReply = function(body) {
  var userMessage = body.message.text;
  var userId = body.message.from.id;

  var answer = findcorrectAnswer(userMessage, navigateToCurrentQuestion());
  // Fallback to default questions
  if(!answer){
    console.log("Trying to find answer through fallback");
    var startQuestions = require('./question-graph').questionGraph;
    answer = findcorrectAnswer(userMessage, startQuestions);
  }

  return answer;
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
}

function navigateToCurrentQuestion(){
  var questionsToFind = require('./question-graph').questionGraph;

  var userPath = database.getUserPath();
  while(userPath.length){
    questionsToFind = questionsToFind[userPath.pop()].questions;
  }
  return questionsToFind;
}
