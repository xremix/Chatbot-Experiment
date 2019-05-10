
var telegram = require('../telegram');

var doYouKnowText = function (person){
  if(person.toLowerCase() == "andi"){
    return "Natürlich kenne ich Andi... was für eine Frage. Er gehört zu meinen Erfindern!";
  }
  if(person.toLowerCase() == "toni"){
    return "Natürlich kenne ich Toni... was für eine Frage. Er gehört zu meinen Erfindern!";
  }
  if(person.match(/(bene|chris|manu|alex)/i) && person.match(/(bene|chris|manu|alex)/i)[0]){
    return `Na klar, ${person} ist klasse... ich kenne ihn aus der Uni`;
  }

  return "Leider nein, habe ich noch nie gehört";
}

function getRandom(answers){
  return answers[Math.floor(Math.random() * answers.length)];
}


exports.findAnswerFromContext = function(db, userId){
  var c = db.getContext(userId);

  if(c.break) {
    db.clearContext(userId);
    return "Tut mir leid, dass ich Dir deine Frage nicht beantworten konnte. Kann ich sonst etwas für Dich tun?";
    // return "Kann ich sonst weiterhelfen?";
  }

  if(c.openQuestionIfShouldShowHelp){
    if(c.openQuestionIfShouldShowHelp === 'expert'){
      db.clearContext(userId);
      return 'Bitte wende Dich an @Akofom oder @thoffmannfom';
    }
    db.clearContext(userId);
    return "Falls ich sonst noch etwas für Dich tun kann, sag gerne bescheid... :-(";
  }

  if(c.productcategory) {
    if(c.product && c.price) {
      db.clearContext(userId);
      return `Das Produkt ${c.product} kostet 123€`;
      // return "Kann ich sonst weiterhelfen?";
    } else if(c.product && c.general) {
      db.clearContext(userId);
      return "Das Produkt ist ein Schraubenzieher. Schaue hier für mehr Informationen: http://link.xyz";
    } else if(c.product && c.availibility) {
      db.clearContext(userId);
      return "Das Produkt kann innerhalb von 2 Tagen geliefert werden. Es sind nur noch wenige Produkte verfügbar";
    } else if(c.product) {
      return "Was möchtest Du über das Produkt wissen? Ich kann Dir Informationen zu dem Preis, Lieferstatus oder allgemeine Informationen geben";
    } else {
      return "Um welche Artikelnummer handelt es sich? Artikelnummern sehen beispielsweise wiefolgt aus: PR-9911231";
    }
  } else {

    if(c.contactInformation){
      db.clearContext(userId);
      return `Du kannst uns jederzeit unter 089123123 zu den folgenden Zeiten anrufen
      Mo-Fr: 09-13 Uhr
      Sa: 10-12 Uhr`;
    }

    if(c.findLocation){
      db.clearContext(userId);
      telegram.sendLocation(process.env.TOKEN, userId, 48.120120, 11.565138, null);
      return `Hier findest Du unseren Store`;
    }

    if(c.showHelp){
      db.clearContext(userId);
      return `Hier ein paar Beispiele die Du mich fragen kannst:
      -  Hallo
      -  Was kostet das Produkt PR-10010?
      -  Was ist der Preis von Artikel PR-91231?
      -  Was ist das Produkt PR-12030?
      -  Ich habe eine Frage zu einem Produkt
      -  Ich möchte den Preis von einem Produkt wissen
      - Dankeschön
      - Kennst Du Andi?
      - Hilfe

      Du sprichst gerade übrigens mit dem Company Bot in der Version ${db.version}
      `;
    }
    if(c.thanks){
      db.clearContext(userId);
      return getRandom([
        "Gerne, kann ich sonst noch etwas für Dich tun?",
        "Klar, ich bin immer für Dich da"
      ]);
    }
    if(c.howDoYouDo){
      db.clearContext(userId);
      getRandom([
        "Alles fit... danke der Nachfrage",
        "Läuft... und bei Dir?",
        "Mir geht es gut, danke. Und selsbt?",
        "Sehr gut. Kann ich Dir behilflich sein?",
        "Gut Danke, kann ich etwas für Dich tun?"
      ]);
    }

    if(c.doYouKnow){
      var name = c.doYouKnow;
      db.clearContext(userId);
      return doYouKnowText(name);
    }

    if(c.welcome){
      db.clearContext(userId);
      return getRandom([
        "Hallo, ich bin der Company Bot. Was ist dein Anliegen?",
        "Hallo, wie kann ich Dir weiter helfen?",
        "Was kann ich für Dich tun?",
        "Hallo, kann ich dir behilflich sein?"
      ]);
    }
  }

  c.openQuestionIfShouldShowHelp = true;
  return "Leider habe ich das nicht verstanden. Soll ich Dir die Hilfe zeigen, oder möchtest Du mit einem Experten sprechen?";
}
