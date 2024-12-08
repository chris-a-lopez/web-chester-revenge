// game.ts
import * as THREE from 'three';
import { GAME_ORIENTATION, RenderEngine, SceneManager, WrenchScene } from 'wrench-game-engine';


const SCENE_TEST_SECTION = 'test';

export class Game {
    private renderEngine: RenderEngine;
    private sceneManager: SceneManager;
    private scene: WrenchScene;
    constructor() {
        // Initialize the game
        this.scene = new WrenchScene();
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 1000);
        const width = 1440;
        const height = 2560;
        // const camera = new THREE.OrthographicCamera(
        //     -width / 2,
        //     width / 2,
        //     height / 2,
        //     -height / 2,
        //     1,
        //     5000
        // );
        this.scene.setCamera(camera);

        // Create a simple cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);  // Add cube to the scene

        // Position the camera
        camera.position.z = 5;

        this.renderEngine = RenderEngine.getInstance();
        this.sceneManager = SceneManager.getInstance();

        this.sceneManager.addScene(SCENE_TEST_SECTION, this.scene);
        this.sceneManager.setCurrentScene(SCENE_TEST_SECTION);
        this.renderEngine.setGameAspectRatio(width, height);
        this.renderEngine.setGameOrientation(GAME_ORIENTATION.BOTH);


        // Start animation
        this.animate();
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));  // Call animate() for the next frame


        // Rotate the cube for animation
        const cube = this.scene.children[0] as THREE.Mesh;
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Render the scene
        this.renderEngine.render();
    }
}

