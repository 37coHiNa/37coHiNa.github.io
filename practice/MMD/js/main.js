//以下より改変して利用。
//three.js でMMDを使う
//https://qiita.com/shoichi1023/items/6cbaefe078c33f600bfe
import { MMDLoader } from "./MMDLoader.js";

const scene = new THREE.Scene();

const ambient = new THREE.AmbientLight(0xeeeeee);
scene.add(ambient);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xcccccc, 0);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 10, 60);

const loader = new MMDLoader();
loader.load(
  "./mmd/miku/miku_v2.pmd",
  function(object) {
    const mesh = object;
    mesh.position.set(0, -10, 0);
    mesh.rotation.set(0, 0, 0);
    scene.add(mesh);
  },
  function(xhr) {
    console.info(xhr);
  },
  function(xhr) {
    console.error("load mmd error");
    console.log(xhr);
  }
);

// リサイズ時
window.addEventListener("resize", WindowResizeEvent => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

requestAnimationFrame(renderer);
renderer.clear();
renderer.render(scene, camera);
