
import * as THREE from "../lib/three.module.js";

const canvas = Object.assign(
  document.createElement( "canvas" ),
  {
    width: 500,
    height: 500
  }
);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer( { canvas } );

const geometry = new THREE.BufferGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x980000 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const animate = function () {
  requestAnimationFrame( animate );
const vertices = new Float32Array( [ ...(function*(){
  for ( const z of [ 1.0, -1.0 ] ) {
    const prams = [
    -1.0, -1.0, z,
     1.0, -1.0, z,
     1.0,  1.0, z,
    ];
    for ( const param of prams ) yield param;
  }
})() ] );
geometry.setAttribute( "position", new THREE.BufferAttribute( vertices, 3 ) );
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render( scene, camera );
};

animate();

const contentArea = Object.assign(
  document.createElement( "div" ),
  {
  }
);
Object.assign(
  contentArea.style,
  {
    textAlign: "center"
  }
);

document.body.appendChild( contentArea ).appendChild( canvas );;
