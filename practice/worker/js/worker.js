import PromisedWorker from "../js/lib/SimplePromisedWorker.js";

PromisedWorker.setMainFunction( value => {
  
  console.log( value );
  return BigInt( value ) ** BigInt( value );
  
} );
