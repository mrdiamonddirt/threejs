import './style.css'

import * as THREE from 'three';

// import the OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// create a scene
const scene = new THREE.Scene();

// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// set the size of the renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// set the position of the camera
camera.position.setZ(30);

// finally render the scene
renderer.render(scene, camera);

// create the geomantry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// create the material
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
// create the mesh adding the geometry and the material
const torus = new THREE.Mesh(geometry, material);

// add the mesh to the scene
scene.add(torus);

// add a point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

// add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// add a helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// add the orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  // randomly position the stars
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// add 200 stars
Array(200).fill().forEach(addStar);

// add the background image
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// create a function to animate the scene
function animate() {
  requestAnimationFrame(animate);
  // animate the mesh
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // update the controls from the OrbitControls
  controls.update();

  renderer.render(scene, camera);
}

animate();