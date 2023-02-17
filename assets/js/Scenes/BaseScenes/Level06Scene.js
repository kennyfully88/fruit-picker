'use strict';

class Level06Scene extends Scene {
	constructor() {
		super();
		this.name = 'level-06';
		this.gameObjects = [];
		this.player = new Player({ dx: 40, dy: 80 });
		this.fadeInOut = 0;

		this.gameObjects.push(
			new Tree({ dx: 0, dy: 0, dw: 100, dh: 10 }), // Top
			new Tree({ dx: 0, dy: 90, dw: 100, dh: 10 }), // Bottom
			new Tree({ dx: 0, dy: 10, dw: 10, dh: 80 }), // Left
			new Tree({ dx: 90, dy: 10, dw: 10, dh: 80 }), // Right
			new Tree({ dx: 40, dy: 10, dw: 20, dh: 60 }),
			new Fruit({ dx: 10, dy: 10 }),
			new Fruit({ dx: 20, dy: 10 }),
			new Fruit({ dx: 30, dy: 10 }),
			new Fruit({ dx: 60, dy: 10 }),
			new Fruit({ dx: 70, dy: 10 }),
			new Fruit({ dx: 80, dy: 10 }),
			new Basket({ dx: 10, dy: 80 }),
			new Basket({ dx: 20, dy: 80 }),
			new Basket({ dx: 30, dy: 80 }),
			new Basket({ dx: 60, dy: 80 }),
			new Basket({ dx: 70, dy: 80 }),
			new Basket({ dx: 80, dy: 80 }),
			new Fireball({ dx: 10, dy: 40, moveCounterMax: 4, animation: 'right' }),
			new Fireball({ dx: 80, dy: 40, moveCounterMax: 4, animation: 'left' }),
			new Fireball({ dx: 10, dy: 70, moveCounterMax: 1 }),
		);

		gameLogic.currentLevel = 6;
	}

	preRender(options) {}

	render(options) {
		if (gameLogic.levelResultRender(options, this)) return;

		options.ctx.fillStyle = options.ctx.createPattern(
			loader.images.ground,
			'repeat',
		);
		options.ctx.fillRect(0, 0, 100, 100);

		this.gameObjects.forEach((object) => {
			object.render(options.ctx);
		});

		this.player.render(options.ctx);

		if (
			!controls.touchPos0.x ||
			!controls.touchPos0.y ||
			!controls.touchPurePos.x ||
			!controls.touchPurePos.y
		) {
			return;
		} else {
			options.ctx.drawImage(
				loader.images.toucher,
				0,
				0,
				10,
				10,
				options.controls.touchPos0.x,
				options.controls.touchPos0.y,
				10,
				10,
			);
		}
	}

	update(sceneManager, options) {
		if (gameLogic.levelResultUpdate(this)) return;

		this.gameObjects.forEach((object) => {
			object.update(sceneManager, options, this.gameObjects);
		});

		this.player.update(sceneManager, options, [this.gameObjects]);
	}
}
