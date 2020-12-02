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

  } ).bind( this )();

  static randomUUID() {
  
    return this.#uuidIte.next().value;
  
  }

  static fromString( stringRepresentation ) {

    stringRepresentation = String( stringRepresentation );

    const data = new Uint8Array( 16 );

    const HEX = Object.freeze( [ ...Array(16) ].map( ( undef, index ) => {

      const hex = index.toString( 16 );
      return Object.freeze( [ index, hex.toLowerCase(), hex.toUpperCase() ] );

    } ) );

    let cursor = 0;
    const consume = ch => {

      if ( cursor >= stringRepresentation.length ) return false;

      if ( stringRepresentation[ cursor ] == ch ) {
 
        cursor++;
        return true;

      }

      return false;

    };

    for ( let i = 0; i < data.length; i++ ) {

      let byte = 0;

      for ( let i = 0; i < 2; i++ ) {

        FOUND: {

          for ( const [ val, low, up ] of HEX ) {

            if ( consume( low ) || consume( up ) ) {

              byte = byte << 4 + val;
              break FOUND;

            }

          }

          throw new TypeError( `not hex index=${ cursor }, char=${ stringRepresentation[ cursor ] }` );
      
        }

      }

      data[ i ] = byte;
        
      switch ( i ) {
        case 3:
        case 5:
        case 7:
        case 9:
          if ( ! consume( "-" ) ) throw new TypeError( `not separator index=${ cursor }, char=${ stringRepresentation[ cursor ] }` );
      }

    }

    return new this( data.buffer );

  }

}

for ( let i = 0; i < 10; i++ ) {
  const uuid = UUID.randomUUID();
  console.log( uuid );
  const str_uuid = String( uuid );
  console.log( UUID.fromString( str_uuid ) );
  console.log( str_uuid );
}
