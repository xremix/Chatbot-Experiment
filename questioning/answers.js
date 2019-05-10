var database = require('./database');

exports.doYouKnowText = function (person){
  if(person.toLowerCase() == "andi"){
    return "Natürlich kenne ich Andi... was für eine Frage. Er gehört zu meinen Erfindern!"
  }
  if(person.toLowerCase() == "toni"){
    return "Natürlich kenne ich Toni... was für eine Frage. Er gehört zu meinen Erfindern!"
  }
  if(person.match(/(bene|chris|manu|alex)/i) && person.match(/(bene|chris|manu|alex)/i)[0]){
    return "Na klar, er ist klasse... ich kenne ihn aus der Uni"
  }

  return "Leider nein, habe ich noch nie gehört";
}

exports.productPriceText = function (product, isCustomer){
  if(!isCustomer){
    return "Das Produkt kostet 3,99€. Für sie als Neukunden gibt es zusätzlich einen Rabatt von 10%";
  }else{
    return "Das Produkt kostet 3,99€.";
  }
}

exports.helpText = function (){
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

  Du sprichst gerade übrigens mit Comp-Bot in der Version ${database.version}
  `;
}
