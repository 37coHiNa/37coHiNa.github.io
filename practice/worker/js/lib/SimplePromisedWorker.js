const isWorkerThread = ( typeof WorkerGlobalScope != "undefined" );

const responseHandler = ( { status, message }, { resolve, reject } ) => {

  switch ( status ) {

    case "success":
      resolve( message );
      return;

    case "failure":
      reject( message );
      return;

  }

};

class PromisedWorker extends Worker {
  
  #requests = new Map();

  constructor( ...args ) {

    super( ...args );

    this.addEventListener( "message", event => {

      const { requestID, status, message } = event.data;

      if ( this.#requests.has( requestID ) ) {

        const { resolve, reject } = this.#requests.get( requestID );
        responseHandler( { status, message }, { resolve, reject } );
        this.#requests.delete( requestID );

      } else {

        this.#requests.set( requestID, { status, message } );

      }

    } );

    this.addEventListener( "error", event => {

      console.error( event );

    } );

  }

  postMessage( message, transfer ) {

    const requestID = ( Math.random() * 2 ** 53 ).toString( 16 ).padStart( 20, "0" );

    super.postMessage( { requestID, message }, transfer );

    return new Promise( ( resolve, reject ) => {

      if ( this.#requests.has( requestID ) ) {
      
        const { status, message } = this.#requests.get( requestID );
        responseHandler( { status, message }, { resolve, reject } );
        this.#requests.delete( requestID );

      } else {

        this.#requests.set( requestID, { resolve, reject } );

      }

    } );

  }
  
  static #mainFunction;
  
  static getMainFunction() {

    return this.#mainFunction;

  }
  
  static setMainFunction( main ) {

    if ( main == null ) {

      this.#mainFunction = null;

    } else if ( typeof main == "function" ) {
    
      this.#mainFunction = main;

    } else {

      throw new TypeError();

    }

  }

}

if ( isWorkerThread ) {

  self.addEventListener( "message", async event => {

    const { requestID, message: args } = event.data;

    try {

      const method = PromisedWorker.getMainFunction();
      const result = method == null ? undefined : method( args );
      self.postMessage( { requestID, status: "success", message: result } );
      return;

    } catch ( error ) {

      self.postMessage( { requestID, status: "failure", message: error } );
      throw error;

    }

  } );

}

export { PromisedWorker as default };