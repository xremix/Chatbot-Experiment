
exports.thanksForAnswer = function (){
  return "Danke für die Antwort";
}





exports.doYouKnow = function (person){
  if(person.toLowerCase() == "andi"){
    return "Natürlich kenne ich Andi... was für eine Frage. Er gehört zu meinen Erfindern!"
  }
  if(person.toLowerCase() == "toni"){
    return "Natürlich kenne ich Andi... was für eine Frage. Er gehört zu meinen Erfindern!"
  }
  if(q.match(/(bene|chris|manu)/i)){
    return "Na klar, er ist klasse... ich kenne ihn aus der Uni"
  }
}
exports.askIfCustomer = function (customerId){
  database.openQuestions[customerId] = 'isCustomer';
  return "Sind sie Kunde?";
}
exports.productPriceMessage = function (product, isCustomer){
  if(!isCustomer){
    return "Das Produkt kostet 3,99€. Für sie als Neukunden gibt es zusätzlich einen Rabatt von 10%";
  }else{
    return "Das Produkt kostet 3,99€.";
  }

}

exports.productInformationMessage = function (product){
  return "Das Produkt ist super... kaufe es doch einfach";
}

exports.randomHello = function (){
  var answers = [
    "Hallo, was ist dein Anliegen?",
    "Hallo, wie kann ich Dir weiter helfen?",
    "Was kann ich für Dich tun?",
    "Hallo, kann ich dir behilflich sein?"
  ];

  return answers[Math.floor(Math.random() * answers.length)];
}

exports.randomThankyou = function (){
  var answers = [
    "Gerne, kann ich sonst noch etwas für Dich tun?",
    "Klar, ich bin immer für Dich da"
  ];

  return answers[Math.floor(Math.random() * answers.length)];
}

exports.helpMessage = function (){
  return `Leider konnte ich deine Frage nicht verstehen. Bitte versuche eine der folgenden Befehle
  -  Was kostet das Produkt PR-10010?
  -  Was ist das Produkt PR-10010?
  - Dankeschön
  `;
}
