
function thanksForAnswer(){
  return "Danke für die Antwort";
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
  - Dankeschön
  `;
}
