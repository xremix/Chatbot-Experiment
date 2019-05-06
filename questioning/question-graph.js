var answers = require('./answers');
exports.questionGraph = [
  {
    answerText: function(q){return answers.doYouKnow(q.match(/Kennst du (.* )?(\w+)?/i)[2])},
    isAnswerTo: function(q){return q.match(/Kennst du (.* )?(\w+)?/i)},
    questions: []
  },{
    answerText: function(q){return answers.randomHello()},
    isAnswerTo: function(q){return q.match(/(hallo|hey|hi|servus)/i)},
    questions: []
  },{
    answerText: function(q){return answers.randomThankyou()},
    isAnswerTo: function(q){return q.match(/(danke|merci)/i)},
    questions: []
  },{
    answerText: function(q){return answers.productPriceMessage(q.match(/(PR-[0-9]+)/i)[0])},
    isAnswerTo: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(preis|kostet|kosten|)/i)},
    questions: []
  },{
    answerText: function(q){return answers.productInformationMessage(q.match(/(PR-[0-9]+)/i)[0])},
    isAnswerTo: function(q){return q.match(/(PR-[0-9]+)/i)},
    questions: []
  },{
    answerText: function(){return "Welches Produkt meinst Du?"},
    isAnswerTo: function(q){return q.match(/(produkt)/i)},
    questions: [
      {
        answerText: function(q){return answers.productInformationMessage(q.match(/(PR-[0-9]+)/i)[0])},
        isAnswerTo: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(frage|informationen|details)/i)},
        questions: []
      },{
        answerText: function(){return "This Product is perfect for your use case"},
        isAnswerTo: function(q){return true},
        questions: []
      }
    ]
  },{
    answerText: function(){return answers.randomHello()},
    isAnswerTo: function(q){return q.match(/(wie|viel|kostet|kosten|preis)/i)},
    questions: []
  }
];
