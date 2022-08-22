import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x272727)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-50, 20, 75)

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

const matRed = new THREE.MeshStandardMaterial({ color: 0xa82323, flatShading: true })
const matGrey = new THREE.MeshStandardMaterial({ color: 0x3c6363, flatShading: true })

// Box
const boxGeo = new THREE.BoxBufferGeometry(16, 17, 10)
const boxMesh = new THREE.Mesh(boxGeo, matRed)
boxMesh.position.set(0, -1, 0)
scene.add(boxMesh)

// Cylindre
const cylindreGeo = new THREE.CylinderBufferGeometry(5, 5, 19, 20)
const cylindreMesh = new THREE.Mesh(cylindreGeo, matRed)
cylindreMesh.rotation.z = 55
cylindreMesh.position.set(-17, -5, 0)
scene.add(cylindreMesh)

var wheels = []
// Cylindre little wheels
for (let index = 0; index < 3; index++) {
    const littleWheelsGeo = new THREE.CylinderBufferGeometry(2.5, 2.5, 12, 15)
    const littleWheelsMesh = new THREE.Mesh(littleWheelsGeo, matGrey)
    littleWheelsMesh.rotation.x = 55
    littleWheelsMesh.position.set(-13 - (index * 5), -9, 0)
    wheels.push(littleWheelsMesh)
    scene.add(littleWheelsMesh)
}

// Cylindre big wheel
const bigWheelsGeo = new THREE.CylinderBufferGeometry(6, 6, 15, 15)
const bigWheelsMesh = new THREE.Mesh(bigWheelsGeo, matGrey)
bigWheelsMesh.rotation.x = 55
bigWheelsMesh.position.set(0, -5.5, 0)
wheels.push(bigWheelsMesh)
scene.add(bigWheelsMesh)

// chimney
const chimneyGeo = new THREE.CylinderBufferGeometry(2, 1, 3)
const chimneyMesh = new THREE.Mesh(chimneyGeo, matGrey)
chimneyMesh.position.set(-22, 1, 0)
scene.add(chimneyMesh)

const railsLenght = 2000
const rails = []
// Rails
function rail(y) {
    const railBarGeo = new THREE.BoxGeometry(railsLenght, 1, 2)
    const railBarMesh = new THREE.Mesh(railBarGeo, new THREE.MeshStandardMaterial({ color: 0x333333, flatShading: true }))
    railBarMesh.position.set(0, -12, y)
    rails.push(railBarMesh)
    scene.add(railBarMesh)
}

rail(5)
rail(-5)

// Woods
function woods(x) {
    const woodGeo = new THREE.BoxGeometry(2, 1, 14)
    const woodMesh = new THREE.Mesh(woodGeo, new THREE.MeshStandardMaterial({ color: 0x522b11, flatShading: true }))
    woodMesh.position.set(x, -13, 0)
    rails.push(woodMesh)
    scene.add(woodMesh)
}

for (let index = -railsLenght / 10; index < railsLenght / 10; index++) {
    woods(index * 5)
}

controls.update()
function animate() {
    requestAnimationFrame(animate);

    wheels.forEach(element => {
        element.rotation.y -= 0.01
    });

    rails.forEach(element => {
        element.position.x += .1
    });

    controls.update()
    renderer.render(scene, camera);
};

animate();