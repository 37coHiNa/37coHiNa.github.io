class AsyncWorker extends Worker {
  
  #requests = new Map();
  
  constructor( url ) {
  
    super( url );
    
    this.addEventListener( "message", event => {
      
      console.log( event );
      
      const { requestID, index, message, status } = event.data;
      console.log( `requestID=${ requestID }, status=${ status }, index=${ index }, message=${ message }` );
      
      const request = this.#equests.get( requestID );
      request.set( index, { message, status } );
      
    } );
    
  }
  
  #createRequestID() {
  
    return Math.random() * Number.MAX_SAFE_INTEGER;
    
  }
  
  postMessage( ...args ) {
    
    const requestID = this.#createRequestID();
    const requests = this.#requests;
    const request = new Map();
    requests.set( requestID, request );
    
    super.postMessage( { requestID, args } );
    
    return ( async function* () {
      
      let index = 0;
      
      for (;;) {
        
        const response = new Promise( resolve => {
        
          (function _(){
          
            if ( request.has( index ) ) {
              
              const data = request.get( index );
              request.delete( index );
              console.log( index, data );
              index++;
              resolve( data );
              
            } else {
              
              setTimeout( _, 0 );
              
            }
        
          })();
        
        } );
        
        console.log( response );
        
        const { message, status } = await response;
        
        console.log( `status=${ status }` );
        console.log( message );
        
        if ( status != "" ) {
          
          console.log( `status=${ status }, length=${ index }` );
          
          return;
        
        }
        
        yield message;
        
      }
      
    } )();
    
  }
  
}

const worker = new AsyncWorker( "./js/worker.js", { type: "module" } );

(async () => {
  const values = worker.postMessage( 1, 2, 3 );
  console.log( values );
  for await ( const value of values ) {
    console.log( value );
  }
})();

setTimeout( async () => {
  const values = worker.postMessage( 1, 2, 3 );
  console.log( values );
  for await ( const value of values ) {
    console.log( value );
  }
}, 5000 );
