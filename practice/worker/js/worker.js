import * as MyWorker from "../js/lib/MyWorker.js";

MyWorker.methods.main = function( request ) {
  console.log( request );
  for ( const arg of request.args ) {
    request.postMessage( arg );
  }
};
