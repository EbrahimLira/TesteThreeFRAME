// Configuração da cena, câmera e renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 680 / 480, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(680, 480, false);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Adicionando luzes à cena
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Configuração do loader do FBX
const loader = new THREE.FBXLoader();
let mixer;

// Carregando o modelo FBX
console.log('Iniciando carregamento do modelo FBX...');
loader.load(
    'model.fbx',
    // onLoad callback
    (object) => {
        console.log('Modelo FBX carregado com sucesso!');
        console.log('Animações disponíveis:', object.animations.length);
        
        // Ajustando a escala do modelo
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        console.log('Dimensões do modelo FBX:');
        console.log('size.x (largura):', size.x);
        console.log('size.y (altura):', size.y);
        console.log('size.z (profundidade):', size.z);
        const maxDim = Math.max(size.x, size.y, size.z);
        console.log('Maior dimensão:', maxDim);
        const scale = 1 / maxDim;
        object.scale.setScalar(scale);
        
        // Centralizando o modelo
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center.multiplyScalar(scale));
        
        // Configurando a animação
        if (object.animations && object.animations.length > 0) {
            mixer = new THREE.AnimationMixer(object);
            const action = mixer.clipAction(object.animations[0]);
            action.play();
            console.log('Animação iniciada');
        } else {
            console.warn('Nenhuma animação encontrada no modelo');
        }
        
        scene.add(object);
    },
    // onProgress callback
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% carregado');
    },
    // onError callback
    (error) => {
        console.error('Erro ao carregar o modelo FBX:', error);
    }
);

// Posicionamento da câmera
camera.position.z = 1;

// Loop de animação
function animate() {
    requestAnimationFrame(animate);
    
    if (mixer) {
        mixer.update(0.032);
    }
    
    renderer.render(scene, camera);
}
animate();

// Adicionando os event listeners após o DOM estar carregado
document.addEventListener('DOMContentLoaded', () => {
    const ambientValue = document.getElementById('ambientValue');
    const directionalValue = document.getElementById('directionalValue');
    const timeline = document.querySelector('.timeline');
    const slider = document.querySelector('.timeline-slider');
    let isDragging = false;

    // Função para atualizar a posição do slider
    function updateSliderPosition(e) {
        if (!isDragging) return;
        const rect = timeline.getBoundingClientRect();
        let x = e.clientX - rect.left;
        
        // Limitar o slider dentro da timeline
        x = Math.max(0, Math.min(x, rect.width - slider.offsetWidth));
        
        // Atualizar posição do slider
        slider.style.left = `${x}px`;
    }

    // Event listeners para o slider
    slider.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Apenas botão esquerdo do mouse
            isDragging = true;
            e.preventDefault(); // Previne seleção de texto
        }
    });

    document.addEventListener('mousemove', (e) => {
        updateSliderPosition(e);
    });

    document.addEventListener('mouseup', (e) => {
        if (e.button === 0) { // Apenas botão esquerdo do mouse
            isDragging = false;
        }
    });

    // Prevenir comportamento padrão de arrastar
    slider.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    document.getElementById('decreaseAmbient').addEventListener('click', () => {
        const currentValue = parseFloat(ambientValue.textContent);
        if (currentValue > 0) {
            const newValue = (currentValue - 0.1).toFixed(1);
            ambientLight.intensity = parseFloat(newValue);
            ambientValue.textContent = newValue;
        }
    });

    document.getElementById('increaseAmbient').addEventListener('click', () => {
        const currentValue = parseFloat(ambientValue.textContent);
        if (currentValue < 1) {
            const newValue = (currentValue + 0.1).toFixed(1);
            ambientLight.intensity = parseFloat(newValue);
            ambientValue.textContent = newValue;
        }
    });

    document.getElementById('decreaseDirectional').addEventListener('click', () => {
        const currentValue = parseFloat(directionalValue.textContent);
        if (currentValue > 0) {
            const newValue = (currentValue - 0.1).toFixed(1);
            directionalLight.intensity = parseFloat(newValue);
            directionalValue.textContent = newValue;
        }
    });

    document.getElementById('increaseDirectional').addEventListener('click', () => {
        const currentValue = parseFloat(directionalValue.textContent);
        if (currentValue < 1) {
            const newValue = (currentValue + 0.1).toFixed(1);
            directionalLight.intensity = parseFloat(newValue);
            directionalValue.textContent = newValue;
        }
    });
}); 