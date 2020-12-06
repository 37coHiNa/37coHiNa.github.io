const emoji = Array( 52 ).fill( 56481 ).map( ( v, i ) => String.fromCodePoint( 55356, v + Math.trunc( i / 13 ) * 16 + i % 13 ) ) ;

class Card {

  #suit;
  #number;

  constructor( suit, number ) {
  
    if ( ! this.constructor.#SUITS.includes( suit ) ) throw new TypeError();
    if ( ! this.constructor.#NUMBERS.includes( number ) ) throw new TypeError();

    this.#suit = suit;
    this.#number = number;

  }

  static #NUMBERS = Array( 13 ).fill( 1 ).map( ( v, i ) => v + i );
  static #SUITS = [ "SPADE", "CLUB", "DIAMOND", "HEART" ];
  static #deck = [ ...Array( this.#SUITS.length ) ].flatMap( ( _, suit ) => [ ...Array( this.#NUMBERS.length ) ].map( ( _, number ) => [ suit, number ] ) );

  static deal( count ) {

    const NUMBERS = this.#NUMBERS;
    const SUITS = this.#SUITS;
    const deck = this.#deck;
    
    const cards = [];

    for ( let i = 0, j = deck.length; i < count; i++, j-- ) {

      const k = Math.trunc( Math.random() * j ) + i;
      [ deck[ i ], deck[ k ] ] = [ deck[ k ], deck[ i ] ];
      const [ suit, number ] = deck[ i ];
      cards.push( new Card( SUITS[ suit ], NUMBERS[ number ] ) );

    }
  
  }

}


const PLAYER_COUNT = 2;
const HAND_COUNT = 6;
const STARTER_COUNT = 1;

const cards = Card.deal( PLAYER_COUNT * HAND_COUNT + STARTER_COUNT );
