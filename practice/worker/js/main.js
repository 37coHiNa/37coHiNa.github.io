import * as PromisedWorker from "../js/lib/PromisedWorker.js";

const worker = new PromisedWorker.Worker( "./js/worker.js", { type: "module" } );
(async ()=>{
  for await ( const message of worker.postMessage( "main", "test message", "test message2", 123 ) ) {
    console.log( message );
  }
})();
window.myWorker = worker;
