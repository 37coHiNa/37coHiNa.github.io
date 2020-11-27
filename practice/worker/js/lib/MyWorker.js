const methods = Object.create( null );

class MyWorker extends Worker {
  
  #messages = [];
  #done = false;

  constructor( ...args ) {
  
    super( ...args );
    
    this.addEventListener( "message", event => {
      
      const { status, message } = event.data;
      
      if ( !status ) {
        
        this.#messages.push( message );
        
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
  #status = "";
  
  constructor( { method, args } ) {
    
    this.#method = method;
    this.#args = args;
    
  }

  get method() { return this.#method; }
  
  get args() { return this.#args; }
  
  get status() { return this.#status; }
  
  postMessage( massage ) {
    
    const status = this.#status;
    
    self.postMessage( { massage, status } );
    
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
