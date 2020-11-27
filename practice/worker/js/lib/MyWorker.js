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

self.addEventListener( "message", event => {

  if ( typeof WorkerGlobalScope != "undefined" ) {
    
    const methodName = "main";
    
    if ( typeof methods[ methodName ] == "function" ) {
      
      methods[ methodName ]( `method=${ methodName }` );
      
    }
    
  }

} );

export { MyWorker as Worker, methods };
