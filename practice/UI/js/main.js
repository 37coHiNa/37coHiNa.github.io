const KeydownEvents = new Map();

self.addEventListener( "keydown", KeyboardEvent => {

  for ( const [ id, resolve ] of KeydownEvents ) {

    resolve( KeyboardEvent );

  }

} );

const id = Math.random();
KeydownEvents.set( id, () => {/*dummy*/} );
setInterval( async () => {

  const resolve = KeydownEvents.get( id );
  resolve( null );
  const KeydownEvent = await new Promise( resolve => KeydownEvents.set( id, resolve ) );
  console.log( KeydownEvent );

}, 3000 );
