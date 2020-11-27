import * as MyWorker from "../js/lib/MyWorker.js";

const worker = new MyWorker.Worker( "./js/worker.js", { type: "module" } );
worker.postMessage( "test message" );
