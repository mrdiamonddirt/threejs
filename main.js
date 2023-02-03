import './style.css'

import * as THREE from 'three';

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
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
// create the mesh adding the geometry and the material
const torus = new THREE.Mesh(geometry, material);

// add the mesh to the scene
scene.add(torus);

// create a function to animate the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();