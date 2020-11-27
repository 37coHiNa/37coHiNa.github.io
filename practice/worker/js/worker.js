import * as PromisedWorker from "../js/lib/PromisedWorker.js";

Object.assign( PromisedWorker.methods,
  {
    
    main( request ) {
      
      request.postMessage( "start" );
      
      for ( const arg of request.args ) {
        
        request.postMessage( arg );
        
      }
      
      request.postMessage( "end" );
      
    }
    
  }

);
