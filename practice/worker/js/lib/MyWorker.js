const methods = Object.create( null );

class MyWorker extends Worker {

  constructor( ...args ) {
  
    super( ...args );
    
    this.addEventListener( "message", event => {
      
      console.log( event );
      
    } );
    
    this.addEventListener( "error", event => {
      
      console.error( event );
      
    } );
    
  }

}

class Request {
  
  #method;
  #args;
  
  constructor( { method, args } ) {
    
    this.#method = method;
    this.#args = args;
    
  }

  get method() { return this.#method; }
  
  get args() { return this.#args; }
  
  postMessage( massage ) {
    
    self.postMessage( massage );
    
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
