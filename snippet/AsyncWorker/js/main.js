class Request extends EventTarget {
  
  #index = 0;
  #length = null;
  #status = "";
  #cache = new Map();
  
  constructor() {
    super();
  }
  
  get index() { return this.#index; }
  
  get length() { return this.#length; }
  
  get status() { return this.#status; }
                
  get cache() { return this.#cache; }
                
  #response( index, message, status ) {
  
    if ( status != "" ) {
      
      if ( this.#status != "" ) {
          
          throw new TypeError();
      
      }
      
      this.#status = status;
      this.#length = index;
      
    } else if ( this.#index == index ) {
        
      for ( let m = message; this.#cache.has( this.#index ) ; ) {
        
        const data = { index: this.#index, message: m };
        this.dispatchEvent( new MessageEvent( "response", { data } ) );
        this.#index++;
        m = this.#cache.get( this.#index );
          
      }
        
      if ( this.#status != "" && this.#length <= this.#index ) {
        
        const data = { status: this.#status, length: this.#length };
        this.dispatchEvent( new MessageEvent( "close", { data } ) );
          
      }
        
    } else {
        
      this.#cache.set( index, message );
        
    }
  
  }

  get response() {
    
    return this.#response;
    
  }
  
}

class AsyncWorker extends Worker {
  
  #requests = new Map();
  
  constructor( url ) {
  
    super( url, { type: "module" } );
    
    this.addEventListener( "message", event => {
      
      console.log( event );
      
      const { requestID, index, message, status } = event.data;
      console.log( `requestID=${ requestID }, status=${ status }, index=${ index }, message=${ message }` );
      
      const request = requests.get( requestID );
      if ( request ) {
        
        request.response( message );
        
      }
      
    } );
    
  }
  
  #createRequestID() {
  
    return Math.random() * Number.MAX_SAFE_INTEGER;
    
  }
  
  async postMessage( ...args ) {
    
    const requestID = this.#createRequestID();
    const requests = this.#requests;
    const request = new Request();
    
    const responseCache = [];
    let count = 0;
      
    request.addEventListener( "response", event => {
        
      responseCache.push( event.data.message );
      count++;
        
    } );
      
    let status = "";
    let error = null;
    let length = null;
    request.addEventListener( "close", event => {
          
      status = event.data.status;
      error = event.data.message;
      length = event.data.length;

    } );
      
    requests.set( requestID, request );
      
    super.postMessage( { requestID, args } );
    
    return ( async function* () {
      
      while (1) {
        
        const next = new Promise( resolve => {
        
          (function _(){
          
            if ( responseCache.length > 0 ) resolve( responseCache.shift() );
            else setTimeout( _, 0 );
        
          })();
        
        } );
        
        console.log( next );
        
        yield await next;
        
        if ( status != "" ) {
          
          console.log( `status=${ status }, count=${ count }, length=${ length }` );
          
          return;
          
        }
        
      }
      
    } )();
    
  }
  
}

const worker = new AsyncWorker( "../js/worker.js", { type: "module" } );

(async () => {
  for ( const value of ( await worker.postMessage( [ 1, 2, 3 ] ) ) ) {
    console.log( value );
  }

} )();
