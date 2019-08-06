exports.getContext = getContext;
exports.setContext = setContext;
exports.clearContext = clearContext;
exports.version = '0.4.33';

var userContextDatabase = {};

function createContextIfDoesntExist(userId){
  if(!userContextDatabase[userId]){ userContextDatabase[userId] = {userContext: {}} }
}

function getContext (userId){
  createContextIfDoesntExist(userId)
  return userContextDatabase[userId].userContext;
}

function setContext (userId, obj){
  userContextDatabase[userId].userContext = obj;
}

function clearContext (userId){
  userContextDatabase[userId] = {userContext: {}}
}
