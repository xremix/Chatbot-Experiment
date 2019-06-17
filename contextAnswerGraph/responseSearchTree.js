var telegram = require('../telegramApi/telegramService');

function getRandom(answers) {
  return answers[Math.floor(Math.random() * answers.length)];
}


exports.getResponseByContext = function(contextStorage, userId) {
  var userContext = contextStorage.getContext(userId);

  if (userContext.break) {
    contextStorage.clearContext(userId);
    return "Der Vorgang wurde abgebrochen 😢 Kann ich dir noch weiterhelfen?";
    // return "Kann ich sonst weiterhelfen?";
  }

  if (userContext.showHelp) {
    contextStorage.clearContext(userId);
    return `Hier ein paar Beispiele die Du mich fragen kannst:
- Hallo
- Wie geht es Dir?
- Was kostet das Produkt PR-10010?
- Was ist der Preis von Artikel PR-91231?
- Was ist das Produkt PR-12030?
- Ich habe eine Frage zu einem Produkt
- Ich möchte den Preis von einem Produkt wissen
- Ich habe eine Frage zu einer Bestellung
- Ich möchte mit einem Experten sprechen
- Dankeschön
- Kennst Du Andi?
- Hilfe

Du sprichst gerade übrigens mit dem Company Bot in der Version ${contextStorage.version}
    `;
  }

  if (userContext.openQuestionIfShouldShowHelp) {
    if (userContext.openQuestionIfShouldShowHelp === 'expert') {
      contextStorage.clearContext(userId);
      return 'Bitte wende Dich an @Akofom oder @thoffmannfom';
    }
    contextStorage.clearContext(userId);
    return "Falls ich sonst noch etwas für Dich tun kann, sag gerne bescheid... :-(";
  }

  if (userContext.orderCategory) {
  if (userContext.orderNumber && userContext.sendBack) {
    contextStorage.clearContext(userId);
    return `Die Lieferung ${context.orderNumber} wird storniert. Sie erhalten in Kürze eine E-Mail mit Details zum rückversand.`;
  }

    if (userContext.orderNumber && userContext.deliveryStatus) {
      contextStorage.clearContext(userId);
      return `Die Lieferung ${userContext.orderNumber} befindet sich auf dem weg und sollte morgen bei ihnen sein.`;
    }
    if (userContext.deliveryStatus) {
      return `Bitte geben sie die Bestellnummer im Format R102310230 an. Dann helfe ich ihnen gerne zu ihrer Bestellung weiter.`;
    }
    if (userContext.sendBack) {
      return `Bitte geben sie die Bestellnummer im Format R102310230 an. Dann können wir ihre Bestellung gerne stornieren.`;
    }
    if (!userContext.orderNumber ) {
      return `Bitte geben sie die Bestellnummer im Format R102310230 an. Dann helfe ich gerne weiter.`;
    }
    return `Möchten sie den Lieferstatus oder eine Reklamation zu ihrer Besetllung?`;

  } else if (userContext.productcategory) {
    if (userContext.product && userContext.price) {
      contextStorage.clearContext(userId);
      return `Das Produkt ${userContext.product} kostet 123€`;
      // return "Kann ich sonst weiterhelfen?";
    } else if (userContext.product && userContext.general) {
      contextStorage.clearContext(userId);
      return "Das Produkt ist ein Schraubenzieher. Schaue hier für mehr Informationen: http://link.xyz";
    } else if (userContext.product && userContext.deliveryStatus) {
      contextStorage.clearContext(userId);
      return "Das Produkt kann innerhalb von 2 Tagen geliefert werden. Es sind nur noch wenige Produkte verfügbar";
    } else if (userContext.product) {
      return "Was möchtest Du über das Produkt wissen? Ich kann Dir Informationen zu dem Preis, Lieferstatus oder allgemeine Informationen geben";
    } else {
      return "Um welche Artikelnummer handelt es sich? Artikelnummern sehen beispielsweise wiefolgt aus: PR-9911231";
    }
  } else {
    if (userContext.orderNumber) {
      return `Sie haben eine Bestellnummer angegeben. Möchten sie den Lieferstatus oder eine Reklamation zu der Bestellung?`;
    }

    if (userContext.wantsExpert) {
      contextStorage.clearContext(userId);
      return 'Bitte wende Dich an @Akofom oder @thoffmannfom';
    }

    if (userContext.contactInformation) {
      contextStorage.clearContext(userId);
      return `Du kannst uns jederzeit unter 089123123 zu den folgenden Zeiten anrufen
      Mo-Fr: 09-13 Uhr
      Sa: 10-12 Uhr`;
    }

    if (userContext.findLocation) {
      contextStorage.clearContext(userId);
      telegram.sendLocation(process.env.TOKEN, userId, 48.120120, 11.565138, null);
      return `Hier findest Du unseren Store`;
    }

    if (userContext.thanks) {
      contextStorage.clearContext(userId);
      return getRandom([
        "Gerne, kann ich sonst noch etwas für Dich tun?",
        "Klar, ich bin immer für Dich da"
      ]);
    }

    if (userContext.doYouKnow) {
      var name = userContext.doYouKnow;
      contextStorage.clearContext(userId);
      if (name.match(/(toni|andi)/i) && name.match(/(toni|andi)/i)[0]) {
        return `Natürlich kenne ich ${name}... was für eine Frage. Er gehört zu meinen Erfindern!`;
      }
      if (name.match(/(bene|chris|kolb|grumpy|alex)/i) && name.match(/(bene|chris|kolb|grumpy|alex)/i)[0]) {
        return `Na klar, ${name} ist klasse... ich kenne ihn aus der Uni`;
      }
      if (name.match(/(ssigmann)/i)) {
        return `Was für eine Frage... ohne ihn gäbe es mich höchstwahrscheinlich nicht`;
      }
      if (name.match(/(Havel)/i)) {
        return `Hätten meine Erfinder mehr auf Herr Dr. Havel gehört hätte ich jetzt wahrschienlich nicht so viele Fähler 🐞`;
      }
      return "Leider nein, habe ich noch nie gehört";
    }


    if (userContext.howDoing) {
      var prefix = userContext.welcome ? "Hallo. " : "";
      var postfix = userContext.welcome ? " Kann ich Dir weiterhelfen?" : "";
      contextStorage.clearContext(userId);
      return getRandom([
        prefix + "Danke der Nachfrage. Es könnte besser sein... ein paar Kollegen aus der Kundenbetreuung mögen mich nicht sonderlich 🤖" + postfix,
        prefix + "Mir geht es super, bin aber gerade etwas im Stress... ich kümmere mich derzeit um 37 Kunden parallel 🏃💨" + postfix,
        prefix + "Mir geht es einfach toll, gestern hatte ich Geburtstag und habe einen neuen Arbeitsspeicher geschenkt bekommen 🎂" + postfix,
        prefix + "Ich könnte etwas Urlaub gebrauchen 🥽🧳 Ich arbeite seit dem 2. Mai ohne Pause 👨‍💻" + postfix,
      ]);
    }

    if (userContext.welcome) {
      contextStorage.clearContext(userId);
      return getRandom([
        "Hallo, ich bin der Company Bot. Was ist dein Anliegen?",
        "Hallo, wie kann ich Dir weiter helfen?",
        "Was kann ich für Dich tun?",
        "Hallo, wie kann ich dir behilflich sein?"
      ]);
    }
  }

  userContext.openQuestionIfShouldShowHelp = true;
  return "Leider habe ich das nicht verstanden. Soll ich Dir die Hilfe zeigen, oder möchtest Du mit einem Experten sprechen?";
}
