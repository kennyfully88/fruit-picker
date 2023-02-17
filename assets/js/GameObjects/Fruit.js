'use strict';

class Fruit {
	constructor(config) {
		this._rng = Math.ceil(Math.random() * 100);
		this.image = config?.image || loader.images.fruit;
		this.dx = config?.dx || 40;
		this.dy = config?.dy || 10;
		this.dw = config?.dw || 10;
		this.dh = config?.dh || 10;
		this.animation = config?.animtion || 'default';
		this.frameCounter = 0;
		this.frameCounterMax = 60;

		this.animations = {
			default: {
				fps: 2,
				frames: {
					0: { sx: 0, sy: 0, sw: 10, sh: 10 },
					1: { sx: 10, sy: 0, sw: 10, sh: 10 },
				},
			},
			rare: {
				fps: 2,
				frames: {
					0: { sx: 0, sy: 10, sw: 10, sh: 10 },
					1: { sx: 10, sy: 10, sw: 10, sh: 10 },
				},
			},
			veryRare: {
				fps: 2,
				frames: {
					0: { sx: 0, sy: 20, sw: 10, sh: 10 },
					1: { sx: 10, sy: 20, sw: 10, sh: 10 },
				},
			},
		};

		this.setRare();
	}

	setRare() {
		if (this._rng == 100) {
			this.animation = 'veryRare';
		} else if (this._rng > 75 && this._rng < 100) {
			this.animation = 'rare';
		}
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

	action(fruits) {
		fruits.splice(fruits.indexOf(this), 1);
		loader.sounds['pickup']._loop = false;
		loader.sounds['pickup'].play();
		gameLogic.fruits++;
	}
}
