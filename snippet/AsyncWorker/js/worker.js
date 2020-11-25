class WorkerRequest {

  #requestID;
  #method;
  #args;
  #status = ""
  
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
    
    return self.postMessage( { requestID, message, status } );
    
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
  
    console.time( `requestID=${requestID}` );
    
    switch ( Request.method ) {
    
      case "init" :
      
        Request.postMessage( true );
        break;
        
      default :
      
        throw new TypeError( `Unsupported method: ${Request.method}` );
        
    }
    
    Request.returnSuccess();
    return;
    
  } catch ( error ) {
  
    Request.throwError( error );
    return;
    
  } finally {
  
    console.timeEnd( `requestID=${requestID}` );
    
  }
  
} );
