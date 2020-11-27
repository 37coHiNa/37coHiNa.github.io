import * as Lib from "../js/lib/PromiseWorker.js";

const worker = new Lib.PromiseWorker( "./js/worker.js", { type: "module" } );

(async () => {
  const values = worker.postMessage( 1, 2, 3 );
  for await ( const value of values ) {
    console.log( value );
  }
})();
