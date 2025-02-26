import * as THREE from 'three';
import CameraControls from 'camera-controls';

CameraControls.install( { THREE: THREE } );

// Initial setup
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera controls
const cameraControls = new CameraControls( camera, renderer.domElement );
cameraControls.setLookAt(
    0, 2, 5, // Camera position
    0, 0, 0  // Look-at target position
);

// Grid helper
const gridHelper = new THREE.GridHelper();

// Default light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);


// Voxel grid
const resolution = 10;

// Cube geometry properly scaled
const geometry = new THREE.BoxGeometry(1, 1, 1);
geometry.scale( 2/resolution, 2/resolution, 2/resolution );
const material = new THREE.MeshToonMaterial();

// Dummy object to easily change transformation matrices
const dummy = new THREE.Object3D();

// Instanced mesh
const mesh = new THREE.InstancedMesh(geometry, material, resolution * resolution);
mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

// Construct scene
scene.add(gridHelper);
scene.add(mesh);

renderer.setAnimationLoop(animate);

// Render loop
function animate() {

    // Stuff here will be executed every frame
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();
    const hasControlsUpdated = cameraControls.update( delta );

    // Computing cubes positions
    let x,y,z = 0;
    for(let i = 0; i < resolution; i++) {
        dummy.position.setZ(((2*i) + 1)/resolution - 1);

        for(let j = 0; j < resolution; j++) {
            dummy.position.setX(((2*j) + 1)/resolution - 1);
            dummy.position.setY( 
                0 //Math.sin(dummy.position.x * Math.PI * 1 + time)
            );
            dummy.updateMatrix();
            console.log(i + resolution * j);
            mesh.setMatrixAt(i + resolution * j, dummy.matrix);
        }
    }
    mesh.instanceMatrix.needsUpdate = true;
    
    renderer.render(scene, camera);
}