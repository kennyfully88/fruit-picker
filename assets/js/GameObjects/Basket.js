'use strict';

class Basket {
	constructor(config) {
		this.image = config?.image || loader.images.basket;
		this.dx = config?.dx || 0;
		this.dy = config?.dy || 0;
		this.dw = config?.dw || 10;
		this.dh = config?.dh || 10;
		this.animation = config?.animtion || 'default';
		this.frameCounter = 0;
		this.frameCounterMax = 60;

		this.animations = {
			default: {
				fps: 1,
				frames: {
					0: { sx: 0, sy: 0, sw: 10, sh: 10 },
				},
			},
			full: {
				fps: 1,
				frames: {
					0: { sx: 10, sy: 0, sw: 10, sh: 10 },
				},
			},
		};
	}

	render(ctx) {
		const currentFrame = Math.floor(
			this.frameCounter /
				(this.frameCounterMax / this.animations[this.animation].fps),
		);

		ctx.drawImage(
			this.image,
			this.animations[this.animation].frames[currentFrame].sx,
			this.animations[this.animation].frames[currentFrame].sy,
			this.animations[this.animation].frames[currentFrame].sw,
			this.animations[this.animation].frames[currentFrame].sh,
			this.dx,
			this.dy,
			this.dw,
			this.dh,
		);
	}

	update() {
		if (this.frameCounter >= this.frameCounterMax - 1) {
			this.frameCounter = 0;
		} else {
			this.frameCounter++;
		}
	}

	action(baskets, player) {
		const basketsArray = baskets.filter(
			(basket) => basket instanceof Basket && basket.animation === 'default',
		);

		if (player.direction === 'up') player.dy++;
		if (player.direction === 'down') player.dy--;
		if (player.direction === 'left') player.dx++;
		if (player.direction === 'right') player.dx--;

		if (gameLogic.fruits > 0 && this.animation !== 'full') {
			gameLogic.fruits--;
			loader.sounds['basket']._loop = false;
			loader.sounds['basket'].play();
			this.animation = 'full';
		}

		if (basketsArray.length <= 0) {
			const level = gameLogic.levels.filter(
				(level) => level.id == gameLogic.currentLevel + 1,
			)[0];

			if (level) {
				level.unlocked = true;
			}

			sceneManager.addScene(new LevelSelectScene());

			gameLogic.levelCleared = true;
		}
	}
}
