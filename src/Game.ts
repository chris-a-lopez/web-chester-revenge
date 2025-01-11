// game.ts
import * as THREE from 'three';
import { GAME_ORIENTATION, RenderEngine, SceneLoader, SceneManager, WrenchScene } from 'wrench-game-engine';


export class Game {
    private renderEngine: RenderEngine;
    private sceneManager: SceneManager;
    constructor() {
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // const camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 1000);
        const width = 2560;
        const height = 1440;
        const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 1000);

        this.renderEngine = RenderEngine.getInstance();
        this.sceneManager = SceneManager.getInstance();

        this.renderEngine.setGameAspectRatio(height, width);
        this.renderEngine.setGameOrientation(GAME_ORIENTATION.LANDSCAPE);

        SceneLoader.loadScene('./assets/scenes/main.yaml', (scene) => {
            scene.setCamera(camera);
            scene.add(camera);
            this.sceneManager.setCurrentScene(scene.name);
        });

        // Start animation
        this.animate();
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));  // Call animate() for the next frame

        // Render the scene
        this.renderEngine.render();
    }
}

