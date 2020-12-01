
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
  
    return this.#uuidIte.next().value;
  
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
  
    return this.#uuidIte.next().value;
  
  }

}

class UUID_crypto_bigint64 {

  static #uuidIte = ( function* () {

    //RFC 4122
    const HEXOCTETS = Object.freeze( [ ...Array(256) ].map( ( e, i ) => i.toString( 16 ).padStart( 2, "0" ).toUpperCase() ) );
    const VARSION = 0x40n;
    const VARIANT = 0x80n;

    for (;;) {

      const random128 = new BigUint64Array( crypto.getRandomValues( new Uint32Array(4) ).buffer );
      yield "" +
        HEXOCTETS[ random128[0] & 0xffn ] +
        HEXOCTETS[ random128[0] >> 8n & 0xffn ] +
        HEXOCTETS[ random128[0] >> 16n & 0xffn ] +
        HEXOCTETS[ random128[0] >> 24n & 0xffn ] + "-" +
        HEXOCTETS[ random128[0] >> 32n & 0xffn ] +
        HEXOCTETS[ random128[0] >> 40n & 0xffn ] + "-" +
        HEXOCTETS[ random128[0] >> 48n & 0x0fn | VARSION ] +
        HEXOCTETS[ random128[0] >> 56n & 0xffn ] + "-" +
        HEXOCTETS[ random128[1] & 0x3fn | VARIANT ] +
        HEXOCTETS[ random128[1] >> 8n & 0xffn ] + "-" +
        HEXOCTETS[ random128[1] >> 16n & 0xffn ] +
        HEXOCTETS[ random128[1] >> 24n & 0xffn ] +
        HEXOCTETS[ random128[1] >> 32n & 0xffn ] +
        HEXOCTETS[ random128[1] >> 40n & 0xffn ] +
        HEXOCTETS[ random128[1] >> 48n & 0xffn ] +
        HEXOCTETS[ random128[1] >> 56n & 0xffn ];

    }

  } )();

  static randomUUID() {
  
    return this.#uuidIte.next().value;
  
  }

}

class UUID_crypto_bigint {

  static #uuidIte = ( function* () {

    //RFC 4122
    const HEXOCTETS = Object.freeze( [ ...Array(256) ].map( ( e, i ) => i.toString( 16 ).padStart( 2, "0" ).toUpperCase() ) );
    const VARSION = 0x40n;
    const VARIANT = 0x80n;

    for (;;) {

      const [ most, least ] = new BigUint64Array( crypto.getRandomValues( new Uint32Array(4) ).buffer );
      yield "" +
        HEXOCTETS[ most & 0xffn ] +
        HEXOCTETS[ most >> 8n & 0xffn ] +
        HEXOCTETS[ most >> 16n & 0xffn ] +
        HEXOCTETS[ most >> 24n & 0xffn ] + "-" +
        HEXOCTETS[ most >> 32n & 0xffn ] +
        HEXOCTETS[ most >> 40n & 0xffn ] + "-" +
        HEXOCTETS[ most >> 48n & 0x0fn | VARSION ] +
        HEXOCTETS[ most >> 56n & 0xffn ] + "-" +
        HEXOCTETS[ least & 0x3fn | VARIANT ] +
        HEXOCTETS[ least >> 8n & 0xffn ] + "-" +
        HEXOCTETS[ least >> 16n & 0xffn ] +
        HEXOCTETS[ least >> 24n & 0xffn ] +
        HEXOCTETS[ least >> 32n & 0xffn ] +
        HEXOCTETS[ least >> 40n & 0xffn ] +
        HEXOCTETS[ least >> 48n & 0xffn ] +
        HEXOCTETS[ least >> 56n & 0xffn ];

    }

  } )();

  static randomUUID() {
  
    return this.#uuidIte.next().value;
  
  }

}

for ( const target of [ UUID_origin, UUID_crypto_spread, UUID_crypto_bigint64, UUID_crypto_bigint ] ) {
  for ( const times of Array( 10 ).fill( 1 ).map( ( v, i ) => v + i ) ) {
    const timeKey = `${ times }: ${ target.name }`;
    const uuids = [];
    console.time( timeKey );
    for ( let i = 0; i < 100000; i++ ) {
      uuids.push( target.randomUUID() );
    }
    console.timeEnd( timeKey );
  }
}
