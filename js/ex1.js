import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x272727)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 25)

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement)

const crossMat = new THREE.LineBasicMaterial({ color: 0xffffff })

var primitives = []
var start = 0

// BOX
const boxGeo = new THREE.BoxGeometry(7, 7, 7)
primitives.push(boxGeo)

// Circle
const circleGeo = new THREE.CircleGeometry(3.5)
primitives.push(circleGeo)

// Cone
const coneGeo = new THREE.ConeGeometry(3.5, 7)
primitives.push(coneGeo)

// Cylindre
const cylindreGeo = new THREE.CylinderGeometry(3.5, 3.5, 7)
primitives.push(cylindreGeo)

// Dode
const dodeGeo = new THREE.DodecahedronGeometry(3.5)
primitives.push(dodeGeo)

// Icosahedron
const icosahedronGeo = new THREE.IcosahedronGeometry(3.5)
primitives.push(icosahedronGeo)

// Octahedon
const octahedonGeo = new THREE.OctahedronGeometry(3.5)
primitives.push(octahedonGeo)

// Plane
const planeGeo = new THREE.PlaneGeometry(7, 7)
primitives.push(planeGeo)

// Polyhedron
const verticesOfCube = [
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
];
const indicesOfFaces = [
    2, 1, 0, 0, 3, 2,
    0, 4, 7, 7, 3, 0,
    0, 1, 5, 5, 4, 0,
    1, 2, 6, 6, 5, 1,
    2, 3, 7, 7, 6, 2,
    4, 5, 6, 6, 7, 4,
];
const polyhedronGeo = new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, 3.5, 2)
primitives.push(polyhedronGeo)

// Ring
const ringGeo = new THREE.RingGeometry(1, 3.5, 18)
primitives.push(ringGeo)

// Shape Heart
const heartShape = new THREE.Shape()
heartShape.moveTo(0, -3)
heartShape.bezierCurveTo(2.5, 0, 1.5, 4, 0, 1.5)
heartShape.bezierCurveTo(-1.5, 4, -2.5, 0, 0, -3)
const hearthGeo = new THREE.ShapeGeometry(heartShape)
primitives.push(hearthGeo)

// Extrude Heart


var row = 0
primitives.forEach((element, index) => {
    if (index == (Math.round(primitives.length / 2))) {
        row = -20
        start = 0
    }
    const line = new THREE.LineSegments(new THREE.EdgesGeometry(element), new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 5 }))
    line.position.set(start, 0, row)

    const mesh = new THREE.Mesh(element, randomColor())
    mesh.position.set(start, 0, row)
    start += 8

    scene.add(line)
    scene.add(mesh)
});

for (var i = -25; i < 100; i++) {
    for (var j = -50; j < 25; j++) {
        createCross([i, -4, j]);
    }
}

function randomColor() {
    const color = new THREE.Color().setHSL(Math.random(), 0.5, 0.5)
    return new THREE.MeshBasicMaterial({ color: color })
}

function createCross(center) {
    var x, y, z
    [x, y, z] = center
    const points = []
    points.push(new THREE.Vector3(x, y, z));
    points.push(new THREE.Vector3(x + 0.5, y, z));
    points.push(new THREE.Vector3(x + 0.25, y, z));
    points.push(new THREE.Vector3(x + 0.25, y, z + 0.25));
    points.push(new THREE.Vector3(x + 0.25, y, z - 0.25));

    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geo, crossMat)
    scene.add(line)
}

controls.update()
function animate() {
    requestAnimationFrame(animate);

    controls.update()
    renderer.render(scene, camera);
};

animate();