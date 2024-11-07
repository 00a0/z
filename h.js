const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
function render() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}
render();

    // Геометрия куба
    const geometry = new THREE.BoxGeometry(2, 2, 2);

    // Преобразуем геометрию в каркасную
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);

    // Материал для каркасной геометрии
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });

    // Создание линии из каркасной геометрии
    const wireframe = new THREE.LineSegments(wireframeGeometry, material);
    scene.add(wireframe);

renderer.render(scene, camera);