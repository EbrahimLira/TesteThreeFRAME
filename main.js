// Configuração da cena, câmera e renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 720 / 520, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(720, 520, false); // Definindo tamanho fixo e desativando o redimensionamento automático
document.body.appendChild(renderer.domElement);

// Criação do retângulo (plano)
const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00FF00, // Cor verde inicial
    side: THREE.DoubleSide // Visível dos dois lados
});
const rectangle = new THREE.Mesh(geometry, material);
rectangle.scale.set(720, 520, 1); // Definindo o tamanho do retângulo
scene.add(rectangle);

// Função para animar a cor do retângulo
function animateColor() {
    const hue = (Date.now() * 0.001) % 1; // Varia de 0 a 1
    const color = new THREE.Color().setHSL(hue, 1, 0.5);
    material.color.set(color);
}

// Posicionamento da câmera
camera.position.z = 1;

// Loop de animação
function animate() {
    requestAnimationFrame(animate);
    animateColor(); // Adiciona a animação de cor
    renderer.render(scene, camera);
}
animate();

// Desativar o evento de redimensionamento da janela
window.addEventListener('resize', function() {
    // Não fazemos nada aqui, mantendo o tamanho fixo
}); 