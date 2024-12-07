// game.ts
import * as THREE from 'three';
import { TextureManager} from 'wrench-game-engine';

export class Game {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;

    constructor() {
        // Initialize the game
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);  // Attach the canvas to the body

        // Create a simple cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);  // Add cube to the scene

        // Position the camera
        this.camera.position.z = 5;

        // Start animation
        this.animate();

        // Handle window resizing
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));  // Call animate() for the next frame

        // Rotate the cube for animation
        const cube = this.scene.children[0] as THREE.Mesh;
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }

    private onWindowResize(): void {
        // Update camera aspect ratio and renderer size on window resize
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
