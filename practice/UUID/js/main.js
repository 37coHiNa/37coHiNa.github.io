class UUID {
  
  #data = new ArrayBuffer( 16 );
  
  constructor( obj ) {
    
    const data = this.#data;
    const bytes = new Uint8Array( obj );
    
    Object.assign(
      new Uint8Array( data ),
      bytes
    );
    
  }

  #most;
  #least;
  #setBits() {

    if ( this.#most != null || this.#least != null ) return;

    [ this.#most, this.#least ] = new BigInt64( this.#data );

  }

  get mostSignificantBits() { this.#setBits(); return this.#most; }

  get leastSignificantBits() { this.#setBits(); return this.#least; }

  static #HEXOCTETS = Object.freeze( [ ...Array(256) ].map( ( e, i ) => i.toString( 16 ).padStart( 2, "0" ).toUpperCase() ) );
  #stringRepresentation;

  toString() {

    if ( this.#stringRepresentation != null ) return this.#stringRepresentation;

    const bytes = new Uint8Array( this.#data );
    const HEXOCTETS = this.constructor.#HEXOCTETS;

    this.#stringRepresentation = "" +
      HEXOCTETS[ bytes[ 0 ] ] +
      HEXOCTETS[ bytes[ 1 ] ] +
      HEXOCTETS[ bytes[ 2 ] ] +
      HEXOCTETS[ bytes[ 3 ] ] + "-" +
      HEXOCTETS[ bytes[ 4 ] ] +
      HEXOCTETS[ bytes[ 5 ] ] + "-" +
      HEXOCTETS[ bytes[ 6 ] ] +
      HEXOCTETS[ bytes[ 7 ] ] + "-" +
      HEXOCTETS[ bytes[ 8 ] ] +
      HEXOCTETS[ bytes[ 9 ] ] + "-" +
      HEXOCTETS[ bytes[ 10 ] ] +
      HEXOCTETS[ bytes[ 11 ] ] +
      HEXOCTETS[ bytes[ 12 ] ] +
      HEXOCTETS[ bytes[ 13 ] ] +
      HEXOCTETS[ bytes[ 14 ] ] +
      HEXOCTETS[ bytes[ 15 ] ];

  }

  valueOf() { return this.toString(); }
  
  static #uuidIte = ( function* () {

    //RFC 4122
    const VARSION = 0x40;
    const VARIANT = 0x80;

    for (;;) {

      const bytes = crypto.getRandomValues( new Uint8Array( 16 ) );
      bytes[ 6 ] = bytes[ 6 ] & 0x0f | VARSION;
      bytes[ 8 ] = bytes[ 8 ] & 0x3f | VARIANT;
      yield new this( bytes.buffer );

    }

  } )();

  static randomUUID() {
  
    return this.#uuidIte.next().value;
  
  }
                              
  #parser =
  class UUIDStringRepresentationParser {
    
    #stringRepresentation;
    #cursor = 0;
    #error;
    
    constructor( stringRepresentation ) {
      
      this.#stringRepresentation = String( stringRepresentation );
      
    }

    #isFinished() { return this.#cursor >= this.#stringRepresentation.length; }

    #consume( ch ) {
    
      if ( this.#isFinished() ) return false;

      stringRepresentation = this.#stringRepresentation;

      if ( stringRepresentation[ cursor ] ) {

        cursor++;
        return true;

      }

      return false;

    }

    static #HEX = Object.freeze( [ ...Array(16) ].map( ( undef, index ) => {

      const hex = index.toString( 16 );
      return Object.freeze( [ index, hex.toLowerCase(), hex.toUpperCase() ] );

    } ) );

    #hex() {

      let val = 0;
      const hex = this.constructor.#HEX;

      for ( let i = 0; i < 2; i++ ) {

        for ( const [ v, low, up ] of hex ) {

          if ( this.#consume( low ) || this.#consume( up ) ) {

            val = val << 4 + v;
            break;

          } else {

            this.#error = new TypeError( `not hex. index=${ this.#cursor }` );
            return 0;

          }
      
        }

      }

      return val;

    }

    #separator() {

      if ( this.#consume( "-" ) ) return true;

      this.#error = new TypeError( `not separator. index=${ this.#cursor }` );
      return false;

    }
          
    parse() {
        
      const data = new Uint8Array( 16 );
      
      for ( let i = 0; i < data.length; i++ ) {

        const hex = this.#hex();
        data[ i ] = hex;
        
        switch ( i ) {
          case 3:
          case 5:
          case 7:
          case 9:
            this.#separator();
        }
        
        if ( this.#error ) return null;

      }

      return data.buffer;
      
    }
    
  };

  static fromString( stringRepresentation ) {

    const uuidBuffer = this.#parser( stringRepresentation ).parse();

    if ( uuidBuffer == null ) throw new TypeError();

    return this( uuidBytes );

  }

}

for ( let i = 0; i < 10; i++ ) {
  const uuid = UUID.randomUUID();
  console.log( uuid );
  const str_uuid = String( uuid );
  console.log( UUID.fromString( str_uuid ) );
  console.log( str_uuid );
}
