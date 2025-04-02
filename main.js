// Configuração da cena, câmera e renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 720 / 520, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(720, 520, false); // Definindo tamanho fixo e desativando o redimensionamento automático
document.body.appendChild(renderer.domElement);

// Criação do retângulo (plano)
const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00FF00, // Cor verde
    side: THREE.DoubleSide // Visível dos dois lados
});
const rectangle = new THREE.Mesh(geometry, material);
rectangle.scale.set(720, 520, 1); // Definindo o tamanho do retângulo
scene.add(rectangle);

// Posicionamento da câmera
camera.position.z = 1;

// Loop de animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Desativar o evento de redimensionamento da janela
window.addEventListener('resize', function() {
    // Não fazemos nada aqui, mantendo o tamanho fixo
}); 