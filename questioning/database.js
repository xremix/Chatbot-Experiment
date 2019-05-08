exports.getUserPath = getUserPath;
exports.appendUserPath = appendUserPath;
exports.clearUserPath = clearUserPath;
exports.version = '0.2.1';

var jsondatabase = {
  user:{

  }
};

function createUserSettingIfDoesntExist(userId){
  if(!jsondatabase.user[userId]){ jsondatabase.user[userId] = {userPath: []} }
}

function getUserPath (userId){
  createUserSettingIfDoesntExist(userId)
  return jsondatabase.user[userId].userPath;
}

function appendUserPath (userId, v){
  createUserSettingIfDoesntExist(userId)
  jsondatabase.user[userId].userPath.push(v);
}

function clearUserPath (userId){
  createUserSettingIfDoesntExist(userId)
  jsondatabase.user[userId].userPath = [];
}
