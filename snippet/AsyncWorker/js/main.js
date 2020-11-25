class Request {
  
  #index = 0;
  #length = null;
  #status = "";
  #cache = new Map();
  
  #response;
  #close;
  
  constructor( response = message => { }, close = () => {} ) {
    
    this.#response = response;
    this.#close = close;
    
  }
  
  get index() { return this.#index; }
  
  set index( index ) { this.#index = index; }
  
  get length() { return this.#length; }
  
  set length( length ) { this.#length = length; }
  
  get status() { return this.#status; }
  
  set status( status ) {
    
    const currentStatus = this.#status;
    
    if ( currentStatus != "" ) {
      
      throw new TypeError();
    
    }
    
    if ( status == "" ) {
      
      return;
    
    }

    this.#status = status;
    
  }
                
  get cache() {
  
    return this.#cache;
    
  }

  get response() {
    
    return this.#response;
    
  }
                
  get close() {
    
    return this.#close;
    
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
      
      if ( status != "" ) {
        
        request.status = status;
        request.length = index;
        
      } else if ( request.index == index ) {
        
        request.response( message );
        request.index++;
        
        for ( ; request.cache.has( request.index ) ; ) {
          
          const message = request.cache.get( request.index );
          request.response( message );
          request.index++;
          
        }
        
        if ( request.status != "" && request.length <= request.index ) {
          
          request.close();
          
        }
        
      } else {
        
        request.cache.set( index, message );
        
      }
      
    } );
    
  }
  
  #createRequestID() {
  
    return Math.random();
    
  }
  
  async postMessage( ...args ) {
    
    const requestID = this.#createRequestID();
    const requests = this.#requests;
    const responses = [];
    let done = false;
    
    requests.set(
      
      requestID,
      
      new Request(
        
        ( message ) => {
          
          responses.push( message );
          
        },
        
        () => {
          
          done = true;
          
        }
        
      )
    
    );
    
    super.postMessage( { requestID, args } );
    
    return async function* () {
      let index = 0;
      
    };
    
  }
  
}

const worker = new AsyncWorker( "../js/worker.js", { type: "module" } );

