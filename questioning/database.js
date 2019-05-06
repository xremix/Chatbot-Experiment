var currentUserPath = [];
function getUserPath (){
  return currentUserPath;
}

function appendUserPath (v){
  currentUserPath.push(v);
}

function clearUserPath (){
  currentUserPath = [];
}

exports.getUserPath = getUserPath;
exports.appendUserPath = appendUserPath;
exports.clearUserPath = clearUserPath;
