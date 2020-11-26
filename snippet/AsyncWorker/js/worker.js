class WorkerRequest {

  #requestID;
  #args;
  #status = ""
  #index = 0;
  
  constructor ( { requestID, args } ) {
  
    this.#requestID = requestID;
    this.#args = args;
    
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

self.addEventListener( "message", event => {

  const Request = new WorkerRequest( event.data );
  
  try {
  
    console.time( `requestID=${ requestID }` );
    
    for ( const arg of Request.args ) {
      
      Request.postMessage( arg );
      
    }
    
    Request.returnSuccess();
    return;
    
  } catch ( error ) {
  
    Request.throwError( error );
    return;
    
  } finally {
  
    console.timeEnd( `requestID=${ requestID }` );
    
  }
  
} );
