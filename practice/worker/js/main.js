import * as MyWorker from "../js/lib/MyWorker.js";

const worker = new MyWorker.Worker( "./js/worker.js" );
worker.postMessage( "test message" );
