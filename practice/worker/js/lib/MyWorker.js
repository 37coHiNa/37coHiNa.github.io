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

export { MyWorker as Worker, methods };
