import * as THREE from 'three';
import WebGL  from 'three/addons/capabilities/WebGL.js';

// Check if the device supports WebGL2
if (!WebGL.isWebGL2Available()) {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.body.appendChild(warning);
}

// Basic setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth/window.innerHeight, 
    0.1, 
    1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Render loop
function animate() {

    // Stuff here will be executed every frame
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);