exports.addToContext = function(db, userId, q) {
  context = db.getContext(userId);
    if (context.openQuestionIfShouldShowHelp) {
      if (q.match(/(experte)/i)) {
        context.openQuestionIfShouldShowHelp = 'expert';
      }else if (q.match(/(hilfe|ja)/i)) {
        db.clearContext(userId);
        context = db.getContext(userId);
        context.showHelp = true;
        context.openQuestionIfShouldShowHelp = 'help';
      }else{
        context.openQuestionIfShouldShowHelp = 'nothing';
      }
      return;
    }

    if (q.match(/(PR-[0-9]+)/i)) {
      context.product = q.match(/(PR-[0-9]+)/i)[0];
      context.productcategory = true;
    }
    if (q.match(/(danke|merci)/i) && q.match(/(danke|merci)/i)[0]) {
      context.thanks = true;
    }
    if (q.match(/(produkt|artikel)/i) && q.match(/(produkt|artikel)/i)[0]) {
      context.productcategory = true;
    }
    if (q.match(/(preis|kostet|kosten)/i) && q.match(/(preis|kostet|kosten)/i)[0]) {
      context.productcategory = true;
      context.price = true;
    }
    if (q.match(/(liefer|lager|verfügbar|versand|zeit|dauer)/i) && q.match(/(liefer|lager|verfügbar|versand|zeit|dauer)/i)[0]) {
      context.productcategory = true;
      context.availibility = true;
    }
    if (q.match(/(wo|ort)/i) && q.match(/(wo|ort)/i)[0]) {
      context.findLocation = true;
    }
    if (q.match(/(hallo|hey|hi|servus)/i) && q.match(/(hallo|hey|hi|servus)/i)[0]){
      context.welcome = true;
    }
    if (q.match(/(nein|halt|stop|nichts|andere frage)/i) && q.match(/(nein|halt|stop|nichts|andere frage)/i)[0]){
      context.break = true;
    }
    if (q.match(/wie.*geht(s|.*dir)/i)) { // TODO not working yet
      context.howDoYouDo = true;
    }
    if (q.match(/(hilfe|helfen)/i) && q.match(/(hilfe|helfen)/i)[0]) {
      context.showHelp = true;
    }
    if (q.match(/Kennst du (.* )?(\w+)?/i)) {
      context.doYouKnow = q.match(/Kennst du (.* )?(\w+)?/i)[2];
    }
    if (q.match(/kontakt|telefon|telephon|anrufen/i) && q.match(/kontakt|telefon|telephon|anrufen/i)[0]) {
      context.contactInformation = true;
    }
    return q;
}