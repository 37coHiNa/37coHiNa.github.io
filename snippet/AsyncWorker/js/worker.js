import Action from "../js/lib/PromiseWorker.js";

Action.methods.main = function( request, ...values ) {

  for ( const value of values ) {
    
    request.postMessage( value );
    
  }
  
};
