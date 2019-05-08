var answers = require('./answers');
exports.questionGraph = [
  {
    template: function(q){return answers.doYouKnow(q.match(/Kennst du (.* )?(\w+)?/i)[2])},
    pattern: function(q){return q.match(/Kennst du (.* )?(\w+)?/i)},
    questions: []
  },{
    template: function(q){return answers.productPriceMessage(q.match(/(PR-[0-9]+)/i)[0])},
    pattern: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(preis|kostet|kosten)/i) && q.match(/(preis|kostet|kosten)/i)[0]},
    questions: []
  },{
    template: function(q){return 'Von welchem Produkt möchtest Du den Preis wissen?'},
    pattern: function(q){return q.match(/(preis|kostet|kosten)/i) && q.match(/(preis|kostet|kosten)/i)[0]},
    questions: [
      {
        template: function(q){return answers.productPriceMessage(q.match(/(PR-[0-9]+)/i)[0])},
        pattern: function(q){return q.match(/(PR-[0-9]+)/i)},
        questions: []
      }
    ]
  },{
    template: function(q){return answers.productInformationMessage(q.match(/(PR-[0-9]+)/i)[0])},
    pattern: function(q){return q.match(/(PR-[0-9]+)/i)},
    questions: []
  },{
    template: function(){return "Welches Produkt meinst Du?"},
    pattern: function(q){return q.match(/(produkt|product)/i)},
    questions: [
      {
        template: function(q){return answers.productPriceMessage(q.match(/(PR-[0-9]+)/i)[0])},
        pattern: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(preis|kostet|kosten)/i) && q.match(/(preis|kostet|kosten)/i)[0]},
        questions: []
      },{
        template: function(q){return "Na logo... das ist so ein super Produkt"},
        pattern: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(soll)/i) && q.match(/(kaufen)/i)},
        questions: []
      },{
        template: function(q){return answers.productInformationMessage(q.match(/(PR-[0-9]+)/i)[0])},
        pattern: function(q){return q.match(/(PR-[0-9]+)/i)},
        questions: []
      }
    ]
  },{
    template: function(q){return answers.helpMessage()},
    pattern: function(q){return q.match(/(hilfe|help)/i) && q.match(/(hilfe|help)/i)[0]},
    questions: []
  },{
    template: function(q){return answers.randomHowAreYou()},
    pattern: function(q){return q.match(/wie.*geht(s|.*dir)/i)},
    questions: []
  },{
    template: function(q){return answers.randomHello()},
    pattern: function(q){return q.match(/(he|hallo|hey|hi|servus)/i) && q.match(/(hallo|hey|hi|servus)/i)[0] && !q.match(/(hilfe|help)/i)},
    questions: []
  },{
    template: function(q){return answers.randomThankyou()},
    pattern: function(q){return q.match(/(danke|merci)/i) && q.match(/(danke|merci)/i)[0]},
    questions: []
  },{
    template: function(q){return 'Leider habe ich das nicht verstanden. Soll ich Dir die Hilfe zeigen?'},
    pattern: function(q){return true},
    questions: [
      {
        template: function(q){return answers.helpMessage()},
        pattern: function(q){return q.match(/(ja)/i)},
        questions: []
      },{
        template: function(q){return 'OK, dann nicht. Falls ich sonst noch etwas für Dich tun kann, sag gerne bescheid... :-('},
        pattern: function(q){return true},
        questions: []
      }
    ]
  }
];
