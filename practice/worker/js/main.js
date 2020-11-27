import * as MyWorker from "../js/lib/MyWorker.js";

const worker = new MyWorker.Worker( "./js/worker.js", { type: "module" } );
(async ()=>{
  for await ( const message of worker.postMessage( "main", "test message", "test message2", 123 ) ) {
    console.log( message );
  }
})();
window.myWorker = worker;
