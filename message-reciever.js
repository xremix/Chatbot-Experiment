var database = {
  customerData: {},
  openQuestions: { }
};

exports.getReply = function(customerMessage, customerId) {
  if (hasOpenQuestion(customerId)){
    if(answerQuestion(customerId, customerMessage)){
      return thanksForAnswer();
    }
  }
  if (customerMessage.match(/(PR-[0-9]+)/i)){
    var product = customerMessage.match(/(PR-[0-9]+)/i)[0];
    if(customerMessage.match(/(wie|viel|kostet|kosten|preis)/i)){
      if(isCustomer(customerId) == null){
        return askIfCustomer(customerId);
      }
      return productPriceMessage(product, isCustomer(customerId));
    } else {
      return productInformationMessage(product);
    }
  } else if(customerMessage.match(/(hallo|hi|hey)/i)) {
    return randomHello();
  } else if(customerMessage.match(/(danke)/i)) {
    return randomThankyou();
  } else {
    return helpMessage();
  }
};

function thanksForAnswer(){
  return "Danke für die Antwort";
}

function isCustomer(customerId){
  if(database.customerData[customerId] === undefined || database.customerData[customerId] == null ||  database.customerData[customerId].isCustomer === undefined || database.customerData[customerId].isCustomer === null){
    return null;
  }
  return database.customerData[customerId];
}

function hasOpenQuestion(customerId){
  return !!database.openQuestions[customerId];
}

function answerQuestion(customerId, customerMessage){
  if(database.openQuestions[customerId] == 'isCustomer'){
    database.openQuestions[customerId] = null;
    if(!database.customerData[customerId]){
      database.customerData[customerId] = {};
    }
    database.customerData[customerId].isCustomer = trure;
  }

}

function askIfCustomer(customerId){
  database.openQuestions[customerId] = 'isCustomer';
  return "Sind sie Kunde?";
}
function productPriceMessage(product, isCustomer){
  if(!isCustomer){
  return "Das Produkt kostet 3,99€. Für sie als Neukunden gibt es zusätzlich einen Rabatt von 10%";
}else{
  return "Das Produkt kostet 3,99€.";
}

}

function productInformationMessage(product){
  return "Das Produkt ist super... kaufe es doch einfach";
}

function randomHello(){
  var answers = [
    "Hallo, was ist dein Anliegen?",
    "Hallo, wie kann ich Dir weiter helfen?",
    "Was kann ich für Dich tun?",
    "Hallo, kann ich dir behilflich sein?"
  ];

  return answers[Math.floor(Math.random() * answers.length)];
}

function randomThankyou(){
  var answers = [
    "Gerne, kann ich sonst noch etwas für Dich tun?",
    "Klar, ich bin immer für Dich da"
  ];

  return answers[Math.floor(Math.random() * answers.length)];
}

function helpMessage(){
  return `Leider konnte ich deine Frage nicht verstehen. Bitte versuche eine der folgenden Befehle
  -  Was kostet das Produkt PR-10010?
  -  Was ist das Produkt PR-10010?
  `;
}
