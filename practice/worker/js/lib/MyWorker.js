const methods = Object.create( null );

class MyWorker extends Worker {

  constructor( ...args ) {
  
    super( ...args );
    
  }

}

export { MyWorker as Worker, methods };
