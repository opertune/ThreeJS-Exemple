import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x272727)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 30, 100)

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(0, 0, 1).normalize();
scene.add(light);

const metal1 = new THREE.MeshStandardMaterial({
    color: 0xFB8526,
    metalness: 1.0,
    roughness: 0.5,
    ambientIntensity: 0.2,
    aoMapIntensity: 1.0,
    envMapIntensity: 1.0,
    normalScale: 1.0
});

const metal2 = new THREE.MeshStandardMaterial({
    color: 0x0A0A0A,
    metalness: 1.0,
    roughness: 0.4,
    ambientIntensity: 0.2,
    aoMapIntensity: 1.0,
    envMapIntensity: 1.0,
    normalScale: 1.0
});


const base = new THREE.CylinderGeometry(20, 20, 8, 100)
const baseMesh = new THREE.Mesh(base, metal2)
scene.add(baseMesh)




controls.update()
function animate() {
    requestAnimationFrame(animate);

    controls.update()
    renderer.render(scene, camera);
};

animate();