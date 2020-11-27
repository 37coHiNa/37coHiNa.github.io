const methods = Object.create( null );

class MyWorker extends Worker {
  
  #messages = [];
  #done = false;

  constructor( ...args ) {
  
    super( ...args );
    
    this.addEventListener( "message", event => {
      
      const { status, message } = event.data;
      
      if ( !status ) {
        
        messages.push( message );
        
      } else {
        
       this.#done =  true;
        
      }
      
    } );
    
    this.addEventListener( "error", event => {
      
      console.error( event );
      
    } );
    
  }

  postMessage( ...args ) {
    
    this.#done = false;
    super.postMessage( ...args );
    
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
