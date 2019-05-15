exports.getContext = getContext;
exports.setContext = setContext;
exports.clearContext = clearContext;
exports.version = '0.3.22';

var jsondatabase = {
  users:{

  }
};

function createContextIfDoesntExist(userId){
  if(!jsondatabase.users[userId]){ jsondatabase.users[userId] = {userContext: {}} }
}

function getContext (userId){
  createContextIfDoesntExist(userId)
  return jsondatabase.users[userId].userContext;
}
function setContext (userId, obj){
  jsondatabase.users[userId].userContext = obj;
}


function clearContext (userId){
  jsondatabase.users[userId] = {userContext: {}}
}
