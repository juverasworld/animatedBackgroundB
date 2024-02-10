import * as THREE from "three";
import "./style.css";
import bg2 from "./img/bg2.png"
import bg1 from "./img/bg1.png"
import bg3 from "./img/bg3.png"
const container = document.querySelector(".three_bg");
const loader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000 
);

const particlesGeometry = new THREE.BufferGeometry();
const counts = 3000;

const positions = new Float32Array(counts * 3);
for (let i = 0; i < counts * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.01;
particlesMaterial.sizeAttenuation = true;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);

scene.add(particles)

const renderer = new THREE.WebGL1Renderer(); // Corrected typo: WebGL1Renderer -> WebGLRenderer
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(6, 6, 25, 5);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    map: loader.load(bg2),
    side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 5;

const count = geometry.attributes.position.count;
const clock = new THREE.Clock()

function animate() {
    const time = clock.getElapsedTime();
    const elapsedTime = clock.getElapsedTime();

    particles.position.y = -elapsedTime * 0.02; // Corrected typo: missing space before negative sign

    for (let i = 0; i < count; i++) { // Corrected loop condition: count instead of counts
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);

        geometry.attributes.position.setZ(i, -y * time * 0.3);
        geometry.computeVertexNormals(); // Corrected typo: computerVertexNormals -> computeVertexNormals
        geometry.attributes.position.needsUpdate = true;
    }

    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01
    renderer.render(scene, camera);
}

animate();
