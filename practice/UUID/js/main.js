
class UUID_origin {

  static #uuidIte = ( function* () {

    //RFC 4122
    const HEXOCTETS = Object.freeze( [ ...Array(256) ].map( ( e, i ) => i.toString( 16 ).padStart( 2, "0" ).toUpperCase() ) );
    const VARSION = 0x40;
    const VARIANT = 0x80;

    for (;;) {

      const s0 = Math.random() * 0x100000000 >>> 0;
      const s1 = Math.random() * 0x100000000 >>> 0;
      const s2 = Math.random() * 0x100000000 >>> 0;
      const s3 = Math.random() * 0x100000000 >>> 0;
      yield "" +
        HEXOCTETS[ s0 & 0xff ] +
        HEXOCTETS[ s0 >>> 8 & 0xff ] +
        HEXOCTETS[ s0 >>> 16 & 0xff ] +
        HEXOCTETS[ s0 >>> 24 & 0xff ] + "-" +
        HEXOCTETS[ s1 & 0xff ] +
        HEXOCTETS[ s1 >>> 8 & 0xff ] + "-" +
        HEXOCTETS[ s1 >>> 16 & 0x0f | VARSION ] +
        HEXOCTETS[ s1 >>> 24 & 0xff ] + "-" +
        HEXOCTETS[ s2 & 0x3f | VARIANT ] +
        HEXOCTETS[ s2 >>> 8 & 0xff ] + "-" +
        HEXOCTETS[ s2 >>> 16 & 0xff ] +
        HEXOCTETS[ s2 >>> 24 & 0xff ] +
        HEXOCTETS[ s3 & 0xff ] +
        HEXOCTETS[ s3 >>> 8 & 0xff ] +
        HEXOCTETS[ s3 >>> 16 & 0xff ] +
        HEXOCTETS[ s3 >>> 24 & 0xff ];

    }

  } )();
  
  static randomUUID() {
  
    return this.##uuidIte.next().value;
  
  }

}

class UUID_crypto_spread {

  static #uuidIte = ( function* () {

    //RFC 4122
    const HEXOCTETS = Object.freeze( [ ...Array(256) ].map( ( e, i ) => i.toString( 16 ).padStart( 2, "0" ).toUpperCase() ) );
    const VARSION = 0x40;
    const VARIANT = 0x80;

    for (;;) {

      const [ s0, s1, s2, s3 ] = crypto.getRandomValues( new Uint32Array(4) );
      yield "" +
        HEXOCTETS[ s0 & 0xff ] +
        HEXOCTETS[ s0 >>> 8 & 0xff ] +
        HEXOCTETS[ s0 >>> 16 & 0xff ] +
        HEXOCTETS[ s0 >>> 24 & 0xff ] + "-" +
        HEXOCTETS[ s1 & 0xff ] +
        HEXOCTETS[ s1 >>> 8 & 0xff ] + "-" +
        HEXOCTETS[ s1 >>> 16 & 0x0f | VARSION ] +
        HEXOCTETS[ s1 >>> 24 & 0xff ] + "-" +
        HEXOCTETS[ s2 & 0x3f | VARIANT ] +
        HEXOCTETS[ s2 >>> 8 & 0xff ] + "-" +
        HEXOCTETS[ s2 >>> 16 & 0xff ] +
        HEXOCTETS[ s2 >>> 24 & 0xff ] +
        HEXOCTETS[ s3 & 0xff ] +
        HEXOCTETS[ s3 >>> 8 & 0xff ] +
        HEXOCTETS[ s3 >>> 16 & 0xff ] +
        HEXOCTETS[ s3 >>> 24 & 0xff ];

    }

  } )();

  static randomUUID() {
  
    return this.##uuidIte.next().value;
  
  }

}

class UUID_crypto_typed_array {

  static #uuidIte = ( function* () {

    //RFC 4122
    const HEXOCTETS = Object.freeze( [ ...Array(256) ].map( ( e, i ) => i.toString( 16 ).padStart( 2, "0" ).toUpperCase() ) );
    const VARSION = 0x40;
    const VARIANT = 0x80;

    for (;;) {

      const random128 = crypto.getRandomValues( new Uint32Array(4) );
      yield "" +
        HEXOCTETS[ random128[0] & 0xff ] +
        HEXOCTETS[ random128[0] >>> 8 & 0xff ] +
        HEXOCTETS[ random128[0] >>> 16 & 0xff ] +
        HEXOCTETS[ random128[0] >>> 24 & 0xff ] + "-" +
        HEXOCTETS[ random128[1] & 0xff ] +
        HEXOCTETS[ random128[1] >>> 8 & 0xff ] + "-" +
        HEXOCTETS[ random128[1] >>> 16 & 0x0f | VARSION ] +
        HEXOCTETS[ random128[1] >>> 24 & 0xff ] + "-" +
        HEXOCTETS[ random128[2] & 0x3f | VARIANT ] +
        HEXOCTETS[ random128[2] >>> 8 & 0xff ] + "-" +
        HEXOCTETS[ random128[2] >>> 16 & 0xff ] +
        HEXOCTETS[ random128[2] >>> 24 & 0xff ] +
        HEXOCTETS[ random128[3] & 0xff ] +
        HEXOCTETS[ random128[3] >>> 8 & 0xff ] +
        HEXOCTETS[ random128[3] >>> 16 & 0xff ] +
        HEXOCTETS[ random128[3] >>> 24 & 0xff ];

    }

  } )();

  static randomUUID() {
  
    return this.##uuidIte.next().value;
  
  }

}

for ( const target of [ UUID_origin, UUID_crypto_spread, UUID_crypto_typed_array ] ) {
  for ( const times of Array( 10 ).fill( 1 ).map( ( v, i ) => v + i ) ) {
    const timeKey = `${ times }: ${ target.name }`;
    const uuids = [];
    console.time( timeKey );
    for ( let i = 0; i < 100000; i++ ) {
      uuids.push( target.randomUUID() );
    }
    console.timeEnd( timeKey );
    console.log( uuids );
  }
}
