// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 720 / 520, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(720, 520);
document.body.appendChild(renderer.domElement);

// Create a black rectangle (plane)
const blackGeometry = new THREE.PlaneGeometry(1, 1);
const blackMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x000000,
    side: THREE.DoubleSide
});
const blackRectangle = new THREE.Mesh(blackGeometry, blackMaterial);
blackRectangle.scale.set(720, 520, 1);
scene.add(blackRectangle);

// Position the camera
camera.position.z = 1;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate(); 