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
camera.position.set(0, 0, 5)

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement)

// Light for flatShading
const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(-40, 50, 25);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 1);
light2.position.set(40, 50, -25);
scene.add(light2);

const geoBox = new THREE.BoxGeometry(1, 1, 1);
const matBox = new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true });
const box = new THREE.Mesh(geoBox, matBox);

// box.alpha = 0;
// createjs.Tween.get(box).to({ alpha: 1 }, 1000).call(handleComplete);
// function handleComplete() {
//     //Tween complete
// }





scene.add(box)
controls.update()
function animate() {
    requestAnimationFrame(animate);

    controls.update()
    renderer.render(scene, camera);
};

animate();