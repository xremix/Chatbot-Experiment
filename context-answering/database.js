exports.getContext = getContext;
exports.setContext = setContext;
exports.clearContext = clearContext;
exports.version = '0.3.7';

var jsondatabase = {
  user:{

  }
};

function createContextIfDoesntExist(userId){
  if(!jsondatabase.user[userId]){ jsondatabase.user[userId] = {userContext: {}} }
}

function getContext (userId){
  createContextIfDoesntExist(userId)
  return jsondatabase.user[userId].userContext;
}
function setContext (userId, obj){
  jsondatabase.user[userId].userContext = obj;
}


function clearContext (userId){
  jsondatabase.user[userId] = {userContext: {}}
}
