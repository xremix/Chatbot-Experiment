var answers = require('./answers');
exports.questionGraph = [
  {
    template: function(q){return answers.doYouKnowText(q.match(/Kennst du (.* )?(\w+)?/i)[2])},
    pattern: function(q){return q.match(/Kennst du (.* )?(\w+)?/i)},
    questions: []
  },{
    template: function(q){return answers.productPriceText(q.match(/(PR-[0-9]+)/i)[0])},
    pattern: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(preis|kostet|kosten)/i) && q.match(/(preis|kostet|kosten)/i)[0]},
    questions: []
  },{
    template: function(q){return 'Von welchem Produkt möchtest Du den Preis wissen?'},
    pattern: function(q){return q.match(/(preis|kostet|kosten)/i) && q.match(/(preis|kostet|kosten)/i)[0]},
    questions: [
      {
        template: function(q){return answers.productPriceText(q.match(/(PR-[0-9]+)/i)[0])},
        pattern: function(q){return q.match(/(PR-[0-9]+)/i)},
        questions: []
      }
    ]
  },{
    template: function(q){return "Das Produkt ist super... kaufe es doch einfach"},
    pattern: function(q){return q.match(/(PR-[0-9]+)/i)},
    questions: []
  },{
    template: function(){return "Welches Produkt meinst Du?"},
    pattern: function(q){return q.match(/(produkt|product)/i)},
    questions: [
      {
        template: function(q){return answers.productPriceText(q.match(/(PR-[0-9]+)/i)[0])},
        pattern: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(preis|kostet|kosten)/i) && q.match(/(preis|kostet|kosten)/i)[0]},
        questions: []
      },{
        template: function(q){return "Na logo... das ist so ein super Produkt"},
        pattern: function(q){return q.match(/(PR-[0-9]+)/i) && q.match(/(soll)/i) && q.match(/(kaufen)/i)},
        questions: []
      },{
        template: function(q){return answers.productInformationText(q.match(/(PR-[0-9]+)/i)[0])},
        pattern: function(q){return q.match(/(PR-[0-9]+)/i)},
        questions: []
      }
    ]
  },{
    template: function(q){return answers.helpText()},
    pattern: function(q){return q.match(/(hilfe|help|helfen)/i) && q.match(/(hilfe|help|helfen)/i)[0]},
    questions: []
  },{
    template: function(q){return getRandom([
        "Alles fit... danke der Nachfrage",
        "Läuft... und bei Dir?",
        "Mir geht es gut, danke. Und selsbt?",
        "Sehr gut. Kann ich Dir behilflich sein?",
        "Gut Danke, kann ich etwas für Dich tun?"
      ])},
    pattern: function(q){return q.match(/wie.*geht(s|.*dir)/i)},
    questions: []
  },{
    template: function(q){return getRandom([
      "Hallo, ich bin Comp-Bot. Was ist dein Anliegen?",
      "Hallo, wie kann ich Dir weiter helfen?",
      "Was kann ich für Dich tun?",
      "Hallo, kann ich dir behilflich sein?"
    ])},
    pattern: function(q){return q.match(/(he|hallo|hey|hi|servus)/i) && q.match(/(hallo|hey|hi|servus)/i)[0] && !q.match(/(hilfe|help)/i)},
    questions: []
  },{
    template: function(q){return getRandom([
        "Gerne, kann ich sonst noch etwas für Dich tun?",
        "Klar, ich bin immer für Dich da"
      ])},
    pattern: function(q){return q.match(/(danke|merci)/i) && q.match(/(danke|merci)/i)[0]},
    questions: []
  },{
    template: function(q){return 'Leider habe ich das nicht verstanden. Soll ich Dir die Hilfe zeigen, oder möchtest Du mit einem Experten sprechen?'},
    pattern: function(q){return true},
    questions: [
      {
        template: function(q){return 'Bitte wende dich an @Akofom oder @thoffmannfom'},
        pattern: function(q){return q.match(/(experten)/i)},
        questions: []
      },{
        template: function(q){return answers.helpText()},
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


function getRandom(answers){
  return answers[Math.floor(Math.random() * answers.length)];
}
