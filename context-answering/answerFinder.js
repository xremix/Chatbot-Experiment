
var telegram = require('../telegram');

function getRandom(answers){
  return answers[Math.floor(Math.random() * answers.length)];
}


exports.findAnswerFromContext = function(db, userId){
  var context = db.getContext(userId);

  if(context.break) {
    db.clearContext(userId);
    return "Tut mir leid, dass ich Dir deine Frage nicht beantworten konnte. Kann ich sonst etwas für Dich tun?";
    // return "Kann ich sonst weiterhelfen?";
  }

  if(context.openQuestionIfShouldShowHelp){
    if(context.openQuestionIfShouldShowHelp === 'expert'){
      db.clearContext(userId);
      return 'Bitte wende Dich an @Akofom oder @thoffmannfom';
    }
    db.clearContext(userId);
    return "Falls ich sonst noch etwas für Dich tun kann, sag gerne bescheid... :-(";
  }

  if(context.productcategory) {
    if(context.product && context.price) {
      db.clearContext(userId);
      return `Das Produkt ${context.product} kostet 123€`;
      // return "Kann ich sonst weiterhelfen?";
    } else if(context.product && context.general) {
      db.clearContext(userId);
      return "Das Produkt ist ein Schraubenzieher. Schaue hier für mehr Informationen: http://link.xyz";
    } else if(context.product && context.availibility) {
      db.clearContext(userId);
      return "Das Produkt kann innerhalb von 2 Tagen geliefert werden. Es sind nur noch wenige Produkte verfügbar";
    } else if(context.product) {
      return "Was möchtest Du über das Produkt wissen? Ich kann Dir Informationen zu dem Preis, Lieferstatus oder allgemeine Informationen geben";
    } else {
      return "Um welche Artikelnummer handelt es sich? Artikelnummern sehen beispielsweise wiefolgt aus: PR-9911231";
    }
  } else if(context.orderCategory) {
    if(contex.orderNumber && context.deliveryStatus){
      db.clearContext(userId);
      return `Die Lieferung ${context.orderNumber} befindet sich auf dem weg und sollte morgen bei ihnen sein.`;
    }
    if(contex.orderNumber && context.sendBack){
      db.clearContext(userId);
      return `Die Lieferung ${context.orderNumber} befindet sich auf dem weg und sollte morgen bei ihnen sein.`;
    }

    if(context.deliveryStatus){
      return `Ich gebe ihnen gerne ein Update zum Lieferstatus ihrer Bestellung. Bitte geben sie die Bestellnummer im Format R102310230 an. Dann können wir ihre Bestellung gerne stornieren.`;
    }
    if(context.sendBack){
      return `Bitte geben sie die Bestellnummer im Format R102310230 an. Dann können wir ihre Bestellung gerne stornieren.`;
    }
    if(!contex.orderNumber ){
      return `Bitte geben sie die Bestellnummer im Format R102310230 an. Dann helfe ich gerne weiter.`;
    }
    return `Möchten sie den Lieferstatus oder eine Reklamation zu ihrer Besetllung?`;

  } else {

    if(contex.orderNumber){
      return `Sie haben eine Bestellnummer angegeben. Möchten sie den Lieferstatus oder eine Reklamation zu der Bestellung?`;
    }

    if(context.contactInformation){
      db.clearContext(userId);
      return `Du kannst uns jederzeit unter 089123123 zu den folgenden Zeiten anrufen
      Mo-Fr: 09-13 Uhr
      Sa: 10-12 Uhr`;
    }

    if(context.findLocation){
      db.clearContext(userId);
      telegram.sendLocation(process.env.TOKEN, userId, 48.120120, 11.565138, null);
      return `Hier findest Du unseren Store`;
    }

    if(context.showHelp){
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
    if(context.thanks){
      db.clearContext(userId);
      return getRandom([
        "Gerne, kann ich sonst noch etwas für Dich tun?",
        "Klar, ich bin immer für Dich da"
      ]);
    }
    if(context.howDoYouDo){
      db.clearContext(userId);
      getRandom([
        "Alles fit... danke der Nachfrage",
        "Läuft... und bei Dir?",
        "Mir geht es gut, danke. Und selsbt?",
        "Sehr gut. Kann ich Dir behilflich sein?",
        "Gut Danke, kann ich etwas für Dich tun?"
      ]);
    }

    if(context.doYouKnow){
      var name = context.doYouKnow;
      db.clearContext(userId);
      if(name.match(/(toni|andi)/i) && name.match(/(toni|andi)/i)[0]){
        return `Natürlich kenne ich ${name}... was für eine Frage. Er gehört zu meinen Erfindern!`;
      }
      if(name.match(/(bene|chris|manu|alex)/i) && name.match(/(bene|chris|manu|alex)/i)[0]){
        return `Na klar, ${name} ist klasse... ich kenne ihn aus der Uni`;
      }
      return "Leider nein, habe ich noch nie gehört";
    }

    if(context.welcome){
      db.clearContext(userId);
      return getRandom([
        "Hallo, ich bin der Company Bot. Was ist dein Anliegen?",
        "Hallo, wie kann ich Dir weiter helfen?",
        "Was kann ich für Dich tun?",
        "Hallo, kann ich dir behilflich sein?"
      ]);
    }
  }

  context.openQuestionIfShouldShowHelp = true;
  return "Leider habe ich das nicht verstanden. Soll ich Dir die Hilfe zeigen, oder möchtest Du mit einem Experten sprechen?";
}
