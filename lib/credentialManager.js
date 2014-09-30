var credentialManager = function(){
  this.providers = [];
};
credentialManager.prototype.getCredential = function(key){

  for (var i = this.providers.length - 1; i >= 0; i--) {
    var provider = this.providers[i];

    var mappedKey = provider.map[key];

    console.log("Key : "+key);
    console.log("Mapped Key : "+mappedKey);

    if (!mappedKey)
      continue;

    var val = provider.eval(mappedKey);
    if(val)
      return val;
  };

  //If we get here, something went wrong
  return undefined;
};
credentialManager.prototype.addProvider = function(name,eval,map){

  var provider = {
    name:name,
    map:map
  };

  //If eval is a function, save that, otherwise save a function that evals the object
  if(typeof(eval) === 'function'){
    provider.eval = eval;
  }else{
    provider.eval = function(val){
      return eval[val];
    };
  }

  //Push to provider array
  this.providers.push(provider);
};

module.exports = credentialManager;