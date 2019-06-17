exports.extendUserContext = function(contextStorage, userId, userMessage) {
  userContext = contextStorage.getContext(userId);
    // Replies
    if (userContext.openQuestionIfShouldShowHelp) {
      if (userMessage.match(/(experte|mensch|profi)/i) && userMessage.match(/(experte|mensch|profi)/i)[0]) {
        userContext.openQuestionIfShouldShowHelp = 'expert';
      } else if (userMessage.match(/(hilfe|ja)/i)) {
        contextStorage.clearContext(userId);
        userContext = contextStorage.getContext(userId);
        userContext.showHelp = true;
        userContext.openQuestionIfShouldShowHelp = 'help';
      } else {
        userContext.openQuestionIfShouldShowHelp = 'nothing';
      }
      return;
    } else {
      if (userMessage.match(/(experte|mensch|profi)/i) && userMessage.match(/(experte|mensch|profi)/i)[0]) {
        userContext.wantsExpert = true;
      }
    }

    // Product / Order Delivery Status
    if (userMessage.match(/(lieferstatus|liefert|lieferbar|liefern|lager|verfügbar|versand|zeit|dauer)/i) && userMessage.match(/(lieferstatus|liefert|lieferbar|liefern|lager|verfügbar|versand|zeit|dauer)/i)[0]) {
      userContext.deliveryStatus = true;
    }
    // Product Category
    if (userMessage.match(/(PR-[0-9]+)/i)) {
      userContext.product = userMessage.match(/(PR-[0-9]+)/i)[0];
      userContext.productcategory = true;
    }
    if (userMessage.match(/(produkt|artikel)/i) && userMessage.match(/(produkt|artikel)/i)[0]) {
      userContext.productcategory = true;
    }
    if (userMessage.match(/(preis|kostet|kosten)/i) && userMessage.match(/(preis|kostet|kosten)/i)[0]) {
      userContext.productcategory = true;
      userContext.price = true;
    }

    // Orders
    if (userMessage.match(/(reklamation|bestellung|lieferung)/i)  && userMessage.match(/(reklamation|bestellung|lieferung)/i)[0]) {
      userContext.orderCategory = true;
    }
    if (userMessage.match(/(zurückgeben|reklamieren|stornieren|vorgang.*abbrechen)/i) && userMessage.match(/zurückgeben|reklamieren|stornieren|vorgang.*abbrechen/i)[0]) {
      userContext.orderCategory = true;
      userContext.sendBack = true;
    }
    if (userMessage.match(/(zurück.*schicken)/i)) {
      userContext.orderCategory = true;
      userContext.sendBack = true;
    }
    if (userMessage.match(/(wann.*lieferung)/i)) {
      userContext.orderCategory = true;
      userContext.deliveryStatus = true;
    }
    if (userMessage.match(/(R[0-9]+)/i)) {
      userContext.orderCategory = true;
      userContext.orderNumber = userMessage.match(/(R[0-9]+)/i)[0];
    }

    // Others
    if (userMessage.match(/(danke|merci)/i) && userMessage.match(/(danke|merci)/i)[0]) {
      userContext.thanks = true;
    }
    if (userMessage.match(/(wo|ort)/i) && userMessage.match(/(wo|ort)/i)[0]) {
      userContext.findLocation = true;
    }
    if (userMessage.match(/(hallo|hey|hi|servus)/i) && userMessage.match(/(hallo|hey|hi|servus)/i)[0]){
      userContext.welcome = true;
    }
    if (userMessage.match(/(wie geht|alles klar.*\?|alles fit)/i) && userMessage.match(/(wie geht|alles klar.*\?|alles fit)/i)[0]){
      userContext.howDoing = true;
    }
    if (userMessage.match(/(abbrechen|abbruch|nein|halt|stop|nichts|andere frage)/i) && userMessage.match(/(abbrechen|abbruch|nein|halt|stop|nichts|andere frage)/i)[0]){
      userContext.break = true;
    }
    if (userMessage.match(/(\/start|hilfe|helfen)/i) && userMessage.match(/(\/start|hilfe|helfen)/i)[0]) {
      userContext.showHelp = true;
    }
    if (userMessage.match(/Kennst du (.* )?(\w+)?/i)) {
      userContext.doYouKnow = userMessage.match(/Kennst du (.* )?(\w+)?/i)[2];
    }
    if (userMessage.match(/kontakt|telefon|telephon|anrufen/i) && userMessage.match(/kontakt|telefon|telephon|anrufen/i)[0]) {
      userContext.contactInformation = true;
    }
    return userContext;
}
