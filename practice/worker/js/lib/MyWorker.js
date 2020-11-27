const methods = Object.create( null );

class MyWorker extends Worker {
  
  #requests = new Map();

  constructor( ...args ) {
  
    super( ...args );
    
    this.addEventListener( "message", event => {
      
      const { requestID, status, message } = event.data;
      
      console.log( `requestID=${ requestID }, status=${ status }, message=${ message }` );
      
      const request = this.#requests.get( requestID );
      //TODO
      
    } );
    
    this.addEventListener( "error", event => {
      
      console.error( event );
      
    } );
    
  }

  postMessage( method, args ) {
    
    const requestID;//TODO
    
    this.#requests.set( requestID, new Map() );
    
    super.postMessage( { requestID, method, args } );
    
  }

}

class Request {
  
  #requestID;
  #method;
  #args;
  #status = "";
  
  constructor( { requestID, method, args } ) {
    
    this.#requestID = requestID;
    this.#method = method;
    this.#args = args;
    
  }

  get method() { return this.#method; }
  
  get args() { return this.#args; }
  
  get status() { return this.#status; }
  
  postMessage( massage ) {
    
    const requestID = this.#requestID;
    const status = this.#status;
    
    self.postMessage( { requestID, massage, status } );
    
  }
  
}

self.addEventListener( "message", event => {

  if ( typeof WorkerGlobalScope != "undefined" ) {
    
    const request = new Request( event.data );
    
    const method = methods[ request.method ];
    
    if ( typeof method == "function" ) {
      
      method( request );
      
    }
    
  }

} );

export { MyWorker as Worker, methods };
