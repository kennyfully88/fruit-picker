'use strict';

class Monster {
	constructor(config) {
		this._rng = Math.ceil(Math.random() * 100);
		this.image = config?.image || loader.images.monster;
		this.dx = config?.dx || 0;
		this.dy = config?.dy || 0;
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

	action(monster, player) {
		player.lost = true;
		player.currentAnimation = 'lost';
		player.frameCounter = '0';
	}
}
