exports.addToContext = function(db, userId, userText){
  context = db.getContext(userId);
  var q = userText;
    if(context.openQuestionIfShouldShowHelp){
      if(q.match(/(experte)/i)){
        context.openQuestionIfShouldShowHelp = 'expert';
      }else if(q.match(/(hilfe|ja)/i)){
        db.clearContext(userId);
        context = db.getContext(userId);
        context.showHelp = true;
        context.openQuestionIfShouldShowHelp = 'help';
      }else{
        context.openQuestionIfShouldShowHelp = 'nothing';
      }
      return;
    }

    if(q.match(/(PR-[0-9]+)/i)){
      context.product = q.match(/(PR-[0-9]+)/i)[0];
      context.productcategory = true;
    }
    if(q.match(/(danke|merci)/i) && q.match(/(danke|merci)/i)[0]){
      context.thanks = true;
    }
    if(q.match(/(produkt|artikel)/i) && q.match(/(produkt|artikel)/i)[0]){
      context.productcategory = true;
    }
    if(q.match(/(preis|kostet|kosten)/i) && q.match(/(preis|kostet|kosten)/i)[0]){
      context.price = true;
    }

    if(q.match(/(he|hallo|hey|hi|servus)/i) && q.match(/(hallo|hey|hi|servus)/i)[0] && !q.match(/(hilfe|help)/i)){
      context.welcome = true;
    }
}
