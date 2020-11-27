const methods = Object.create( null );

class MyWorker extends Worker {
  
  #requests = new Map();

  constructor( ...args ) {
  
    super( ...args );
    
    this.addEventListener( "message", event => {
      
      const { requestID, status, index, message } = event.data;
      
      console.log( `[MyWorker.onMessage()] requestID=${ requestID }, status=${ status }, index=${ index }, message=${ message }` );
      
      const request = this.#requests.get( requestID );
      request.set( index, { status, message } );

    } );
    
    this.addEventListener( "error", event => {
      
      console.error( event );
      
    } );
    
  }

  async * postMessage( method, ...args ) {
    
    const requestID = Math.random();
    
    console.log( `[MyWorker.postMessage()] requestID=${ requestID }, method=${ method }, args=${ args }` );
    
    const request = new Map();
    request.status = "";
    this.#requests.set( requestID, request );
    
    super.postMessage( { requestID, method, args } );
    
    let index = 0;
    for (;;) {
        
      const { status, message } = await new Promise( resolve => {
        
        setInterval( () => {
          
          if ( request.has( index ) ) {

            resolve( request.get( index ) );
            request.delete( index );
            index++;
            
          }
          
        }, 0 );
          
      } );
      
      yield message;
        
      if ( status ) {
        return;
      }
        
    }

  }

}

class Request {
  
  #requestID;
  #method;
  #args;
  #status = "";
  #index = 0;
  
  constructor( { requestID, method, args } ) {
    
    this.#requestID = requestID;
    this.#method = method;
    this.#args = args;
    
  }

  get method() { return this.#method; }
  
  get args() { return this.#args; }
  
  get status() { return this.#status; }
  
  postMessage( message ) {
    
    const requestID = this.#requestID;
    const status = this.#status;
    const index = this.#index++;
    
    console.log( `[Request.postMessage()] requestID=${ requestID }, status=${ status }, index=${ index }, message=${ message }` );
    
    self.postMessage( { requestID, status, index, message } );
    
  }
  
  end() {
    
    if ( this.#status ) return;
    
    this.#status = "end";
    
    this.postMessage();
    
  }
  
}

self.addEventListener( "message", event => {

  if ( typeof WorkerGlobalScope != "undefined" ) {
    
    const request = new Request( event.data );
    
    const method = methods[ request.method ];
    
    if ( typeof method == "function" ) {
      
      method( request );
      
    }
    
    request.end();
    
  }

} );

export { MyWorker as Worker, methods };
