class AsyncWorker extends Worker {
  
  #requests = new Map();
  
  constructor( url ) {
  
    super( url, { type: "module" } );
    
    this.addEventListener( "message", event => {
      
      console.log( event );
    
    } );
    
  }
  
  #createRequestID() {
  
    return Math.random();
    
  }
  
  async invoke( method, ...args ) {
    
    const requestID = this.#createRequestID();
    const responses = [];
    
    this.#requests.set( requestID, responses );
    
    super.postMessage( { requestID, message: method, args } );
    
    return async function* () {
    };
    
  }
  
}

const worker = new Worker( "../js/worker.js", { type: "module" } );

