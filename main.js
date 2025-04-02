// Configuração da cena, câmera e renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 720 / 520, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Adicionando alpha para transparência
renderer.setSize(720, 520, false);
document.body.appendChild(renderer.domElement);

// Criação do retângulo (plano)
const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00FF00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5 // Tornando o retângulo semi-transparente
});
const rectangle = new THREE.Mesh(geometry, material);
rectangle.scale.set(720, 520, 1);
scene.add(rectangle);

// Configuração do loader do FBX
const loader = new THREE.FBXLoader();
let mixer; // Para controlar a animação

// Carregando o modelo FBX
loader.load('model.fbx', (object) => {
    // Ajustando a escala do modelo para caber dentro do retângulo
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 0.5 / maxDim; // Ajuste este valor para controlar o tamanho do modelo
    object.scale.setScalar(scale);
    
    // Centralizando o modelo
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center.multiplyScalar(scale));
    
    // Configurando a animação
    mixer = new THREE.AnimationMixer(object);
    const action = mixer.clipAction(object.animations[0]);
    action.play();
    
    scene.add(object);
});

// Função para animar a cor do retângulo
function animateColor() {
    const hue = (Date.now() * 0.001) % 1;
    const color = new THREE.Color().setHSL(hue, 1, 0.5);
    material.color.set(color);
}

// Posicionamento da câmera
camera.position.z = 1;

// Loop de animação
function animate() {
    requestAnimationFrame(animate);
    animateColor();
    
    // Atualizando a animação do modelo FBX
    if (mixer) {
        mixer.update(0.016); // Delta time aproximado para 60fps
    }
    
    renderer.render(scene, camera);
}
animate();

// Desativar o evento de redimensionamento da janela
window.addEventListener('resize', function() {
    // Não fazemos nada aqui, mantendo o tamanho fixo
}); 