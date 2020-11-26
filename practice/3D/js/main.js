
import * as THREE from "./lib/three.module.js";

const canvas = document.createElement( "canvas" );
canvas.width = 500;
canvas.height = 500;

const contentArea = document.createElement( "div" );
contentArea.style.textAlign = "center";

document.body.appendChild( contentArea ).appendChild( canvas );

const formData = {
  camera: {
    position: {
      x: 0,
      y: 0,
      z: 5
    }
  },
  color: {
    red: 0.596078431372549,
    green: 0,
    blue: 0
  }
  vertices: []
  
};

const form = document.createElement( "form" );

function vertices_onChange( event ) {
  
  const index = [ ...form.querySelectorAll( `[name="vertices"]` ) ].indexOf( event.target );
  
  if ( index == -1 ) {
    
    console.error( event );
    return;
    
  }
  
  formData.vertices[ index ] = Number( event.target.value ) || 0.0;
  
}

function addRow_vertices( x = 0.0, y = 0.0, z = 0.0 ) {
  
  const row = form.appendChild( document.createElement( "p" ) );
  
  for ( const value of [ x, y, z ] ) {
    
    Object.assign( row.appendChild( document.createElement( "input" ) ),
      {
        name: "vertices",
        value
      }
    ).addEventListener( "change", vertices_onChange );
    
    formData.vertices.push( value );
    
  }
  
  return row;
  
}

for ( let i = 0; i < 3; i++ ) {
  
  addRow_vertices();
  
}

document.body.appendChild( form );

const renderer = new THREE.WebGLRenderer( { canvas } );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );

const geometry = new THREE.BufferGeometry();
const material = new THREE.MeshBasicMaterial();
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const animate = function () {
  requestAnimationFrame( animate );
  camera.position.set( formData.camera.position.x, formData.camera.position.y, formData.camera.position.z );
  material.color.setRGB( formData.color.red, formData.color.green, formData.color.blue );
  geometry.setAttribute( "position", new THREE.BufferAttribute( new Float32Array( formData.vertices ), 3 ) );
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render( scene, camera );
};

animate();

