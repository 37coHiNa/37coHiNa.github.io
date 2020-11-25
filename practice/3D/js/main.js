
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
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0
] );
geometry.setAttribute( "position", new THREE.BufferAttribute( vertices, 3 ) );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const animate = function () {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
};

animate();

const contentArea = Object.assign(
  document.createElement( "div" ),
  {
  }
);
contentArea.appendChild( canvas );

document.body.appendChild( contentArea );
