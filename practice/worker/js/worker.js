import * as MyWorker from "../js/lib/MyWorker.js";

MyWorker.methods.main = function( ...args ) {
  console.log( args );
};
