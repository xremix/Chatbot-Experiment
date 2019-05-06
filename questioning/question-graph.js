var answers = require('./answers');
exports.questionGraph = [
  {
    answerText: function(q){return answers.doYouKnow(q.match(/Kennst du (.* )?(\w+)?/i)[2])},
    isAnswerTo: function(q){return q.match(/Kennst du (.* )?(\w+)?/i)},
    questions: []
  },{
    answerText: function(q){return answers.productPriceMessage(q.match(/(PR-[0-9]+)/i)[0])},
    isAnswerTo: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(preis|kostet|kosten|)/i)[0]},
    questions: []
  },{
    answerText: function(q){return answers.productInformationMessage(q.match(/(PR-[0-9]+)/i)[0])},
    isAnswerTo: function(q){return q.match(/(PR-[0-9]+)/i)},
    questions: []
  },{
    answerText: function(){return "Welches Produkt meinst Du?"},
    isAnswerTo: function(q){return q.match(/(produkt|product)/i)},
    questions: [
      {
        answerText: function(q){return answers.productPriceMessage(q.match(/(PR-[0-9]+)/i)[0])},
        isAnswerTo: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(preis|kostet|kosten|)[0]/i)},
        questions: []
      },{
        answerText: function(q){return "Na logo... das ist so ein super Produkt"},
        isAnswerTo: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(soll)/i) && q.match(/(kaufen)/i)},
        questions: []
      },{
        answerText: function(q){return answers.productInformationMessage(q.match(/(PR-[0-9]+)/i)[0])},
        isAnswerTo: function(q){return q.match(/(PR-[0-9]+)/i)},
        questions: []
      }
    ]
  },{
    answerText: function(q){return answers.randomHello()},
    isAnswerTo: function(q){return q.match(/(hallo|hey|hi|servus)/i)[0]},
    questions: []
  },{
    answerText: function(q){return answers.randomThankyou()},
    isAnswerTo: function(q){return q.match(/(danke|merci)/i)[0]},
    questions: []
  }
];
