
exports.getReply = function(customerMessage) {

  if (customerMessage.match(/(PR-[0-9]+)/i)){
    if(customerMessage.match(/(wie|viel|kostet|kosten|preis)/i)){
      return productPriceMessage();
    } else {
      return productInformationMessage();
    }
  } else if(customerMessage.match(/(hallo|hi|hey)/i)) {
    return randomHello();
  } else {
    return helpMessage();
  }
};

function productPriceMessage(){
  return "Das Produkt kostet 3,99€. Für Neukunden gibt es einen Rabatt von 10%";
}
function productInformationMessage(){
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

function helpMessage(){
  return `Leider konnte ich deine Frage nicht verstehen. Bitte versuche eine der folgenden Befehle
  -  Was kostet das Produkt PR-10010?
  -  Was ist das Produkt PR-10010?
  `;
}
