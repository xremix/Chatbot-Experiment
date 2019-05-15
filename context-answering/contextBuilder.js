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
    }else{
      if (q.match(/(experte|mensch)/i) && q.match(/(experte|mensch)/i)[0]) {
        context.wantsExpert = true;
      }
    }

    if (q.match(/(PR-[0-9]+)/i)) {
      context.product = q.match(/(PR-[0-9]+)/i)[0];
      context.productcategory = true;
    }
    if (q.match(/(produkt|artikel)/i) && q.match(/(produkt|artikel)/i)[0]) {
      context.productcategory = true;
    }
    if (q.match(/(preis|kostet|kosten)/i) && q.match(/(preis|kostet|kosten)/i)[0]) {
      context.productcategory = true;
      context.price = true;
    }
    if (q.match(/(reklamation|bestellung|lieferung)/i)  && q.match(/(reklamation|bestellung|lieferung)/i)[0]) {
      context.orderCategory = true;
    }
    if (q.match(/(zurückgeben|reklamieren)/i) && q.match(/zurückgeben|reklamieren/i)[0]) {
      context.orderCategory = true;
      context.sendBack = true;
    }

    if (q.match(/(zurück.*schicken)/i)) {
      context.orderCategory = true;
      context.sendBack = true;
    }
    if (q.match(/(lieferstatus)/i)) {
      context.orderCategory = true;
      context.deliveryStatus = true;
    }
    if (q.match(/(wann.*lieferung)/i)) {
      context.orderCategory = true;
      context.deliveryStatus = true;
    }

    if (q.match(/(R[0-9]+)/i)) {
      context.orderNumber = q.match(/(R[0-9]+)/i)[0];
    }

    if (q.match(/(liefer|lager|verfügbar|versand|zeit|dauer)/i) && q.match(/(liefer|lager|verfügbar|versand|zeit|dauer)/i)[0]) {
      context.productcategory = true;
      context.deliveryStatus = true;
    }
    if (q.match(/(danke|merci)/i) && q.match(/(danke|merci)/i)[0]) {
      context.thanks = true;
    }
    if (q.match(/(wo|ort)/i) && q.match(/(wo|ort)/i)[0]) {
      context.findLocation = true;
    }
    if (q.match(/(hallo|hey|hi|servus)/i) && q.match(/(hallo|hey|hi|servus)/i)[0]){
      context.welcome = true;
    }
    if (q.match(/(abbruch|nein|halt|stop|nichts|andere frage)/i) && q.match(/(abbruch|nein|halt|stop|nichts|andere frage)/i)[0]){
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
