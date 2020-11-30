import PromisedWorker from "../js/lib/SimplePromisedWorker.js";

const worker = new PromisedWorker( "./js/worker.js", { type: "module" } );
window.myWorker = worker;
(async ()=>{
  const value1 = await worker.postMessage( 20 );
  const value2 = await worker.postMessage( value1 );
  console.log( [ value1, value2 ] );
})();
