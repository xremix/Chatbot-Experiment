


function getRandom(answers){
  return answers[Math.floor(Math.random() * answers.length)];
}


exports.findAnswerFromContext = function(db, userId){
  var c = db.getContext(userId);

  if(c.showHelp){
    db.clearContext(userId);
    return ("Hier die hilfe")
  }

  if(c.openQuestionIfShouldShowHelp){

    if(c.openQuestionIfShouldShowHelp === 'expert'){
      // clear c.openQuestionIfShouldShowHelp
      return 'Bitte wende Dich an @Akofom oder @thoffmannfom';
    }else{
      return "OK, dann nicht. Falls ich sonst noch etwas für Dich tun kann, sag gerne bescheid... :-(";
    }
  }

  if(c.productcategory) {
    if(c.product && c.price) {
      db.clearContext(userId);
      return ("Das Produkt 1023213 kostet 123€")
      // return ("Kann ich sonst weiterhelfen?")
    } else if(c.product && c.general) {
      db.clearContext(userId);
      return ("Das Produkt ist ein Schraubenzieher. Schaue hier für mehr Informationen: http://link.xyz")
    } else if(c.product && c.availibility) {
      db.clearContext(userId);
      return ("Das Produkt kann innerhalb von 2 Tagen geliefert werden. Es sind nur noch wenige Produkte verfügbar")
    } else if(c.product) {
      return ("Was möchtest Du über das Produkt wissen? Ich kann Dir Informationen zu dem Preis, Lieferstatus oder allgemeine Informationen geben")
    } else {
      return "Um welches Produkt handelt es sich?"
    }
  }else if(c.welcome){
      db.clearContext(userId);
      return getRandom([
        "Hallo, ich bin der Company Bot. Was ist dein Anliegen?",
        "Hallo, wie kann ich Dir weiter helfen?",
        "Was kann ich für Dich tun?",
        "Hallo, kann ich dir behilflich sein?"
      ]);
  }else{
    // clear c
    c.openQuestionIfShouldShowHelp = true;
    return "Leider habe ich das nicht verstanden. Soll ich Dir die Hilfe zeigen, oder möchtest Du mit einem Experten sprechen?";
  }
  // return c;
}
