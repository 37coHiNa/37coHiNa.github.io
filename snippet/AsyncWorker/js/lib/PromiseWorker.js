
class PromiseWorker extends Worker {
  
  #requests = new Map();
  
  constructor( url ) {
  
    super( url, { type: "module" } );
    
    this.addEventListener( "message", event => {
      
      const { requestID, index, message, status } = event.data;
      const request = this.#requests.get( requestID );
      request.set( index, { message, status } );
      
    } );
    
    this.addEventListener( "error", event => {
      
      console.error( event );
      
    } );
    
  }
  
  #createRequestID() {
  
    return ( Math.random() * 2 ** 53 ).toString( 16 ).padStart( 20, "0" );
    
  }
  
  postMessage( ...args ) {
    
    const requestID = this.#createRequestID();
    const requests = this.#requests;
    const request = new Map();
    requests.set( requestID, request );
    
    super.postMessage( { requestID, args } );
    
    return ( async function* () {
      
      let index = 0;
      
      for (;;) {
        
        const response = new Promise( resolve => {
        
          (function _(){
          
            if ( request.has( index ) ) {
              
              const data = request.get( index );
              request.delete( index );
              index++;
              resolve( data );
              
            } else {
              
              setTimeout( _, 0 );
              
            }
        
          })();
        
        } );
        
        const { message, status } = await response;
        
        if ( status != "" ) {
          
          return;
        
        }
        
        yield message;
        
      }
      
    } )();
    
  }
  
}

class WorkerRequest {

  #requestID;
  #method;
  #args;
  #status = ""
  #index = 0;
  
  constructor ( { requestID, method, args } ) {
  
    this.#requestID = requestID;
    this.#method = method;
    this.#args = args;
    
  }
  
  get method() {
  
    return this.#method;
    
  }
  
  get args() {
    
    return this.#args;
    
  }
  
  #postMessage( message ) {
  
    const requestID = this.#requestID;
    const status = this.#status;
    const index = this.#index;
    
    this.#index++;
    return self.postMessage( { requestID, message, index, status } );
    
  }
  
  #responseStatus( status, message ) {
    
    if ( this.#status != "" ) {
    
      throw new TypeError( `status: ${ this.#status }` );
      
    }
    
    this.#status = status;
    
    return this.#postMessage( message );
  
  }
  
  postMessage( message ) {
    
    return this.#postMessage( message );
    
  }
  
  throwError( error ) {
  
    return this.#responseStatus( "failure", error );
    
  }
  
  returnSuccess( message ) {
  
    return this.#responseStatus( "success", message );
    
  }
  
}

const Action = new class {

  #methods = Object.create(null);
  
  constructor() {
  }
  
  get methods() {
  
    return this.#methods;
    
  }
  
};

if ( typeof WorkerGlobalScope != "undefined" ) {

  self.addEventListener( "message", event => {
  
    const Request = new WorkerRequest( event.data );

    try {
    
      const methodName = Request.method || "main";

      if ( typeof Action.methods[ methodName ] == "function" ) {
        
        Action.methods[ methodName ]( Request, ...Request.args );
        
      }
    
      Request.returnSuccess();
      return;
    
    } catch ( error ) {
  
      Request.throwError( error );
      return;
    
    } finally {
    
  }
  
} );

export { PromiseWorker, WorkerRequest, Action };
