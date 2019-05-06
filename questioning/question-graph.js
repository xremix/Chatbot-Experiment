var answers = require('./answers');
exports.questionGraph = [
  {
    debug: 'you are on level 1',
    answerText: function(){return answers.randomHello()},
    isAnswerTo: function(q){return q.match(/(wie|viel|kostet|kosten|preis)/i)},
    questions: []
  },{
    answerText: function(){return answers.randomHello()},
    isAnswerTo: function(q){return q.match(/(wie|viel|kostet|kosten|preis)/i)},
    questions: []
  },{
    answerText: function(){return "Which product?"},
    isAnswerTo: function(q){return q.match(/(product)/i)},
    questions: [
      {
        debug: 'you are on level 2',
        answerText: function(){return "Product XY is very expensive"},
        isAnswerTo: function(q){return false},
        questions: null
      },
      {
        answerText: function(){return "This Product is perfect for your use case"},
        isAnswerTo: function(q){return true},
        questions: null
      }
    ]
  }
]
