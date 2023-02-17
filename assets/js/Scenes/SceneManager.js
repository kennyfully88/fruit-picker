'use strict';

class SceneManager {
	constructor(config) {
		this.scenes = config?.scenes || {};
		this.currentScene = config?.currentScene || 'title-scene';
	}

	addScene(scene) {
		this.scenes[scene.name] = scene;
	}

	// todo make replaceScene method

	init(options) {
		this.preRenderScene(options);
	}

	preRenderScene(options) {
		// usually cameera logic
		this.scenes[this.currentScene].preRender(options);
		this.renderScene(options);
	}

	renderScene(options) {
		options.ctx.clearRect(
			0,
			0,
			options.ctx.canvas.width,
			options.ctx.canvas.height,
		);
		// usually camera and ctx logic
		this.scenes[this.currentScene].render(options);
		this.updateScene(options);
	}

	updateScene(options) {
		// usually sceneManager logic
		this.scenes[this.currentScene].update(this, options);
		requestAnimationFrame(() => this.preRenderScene(options));
	}
}
