'use strict';

class Fireball {
	constructor(config) {
		this._rng = Math.ceil(Math.random() * 100);
		this.image = config?.image || loader.images.fireball;
		this.dx = config?.dx || 0;
		this.dy = config?.dy || 0;
		this.dw = config?.dw || 10;
		this.dh = config?.dh || 10;
		this.animation = config?.animation || 'left';
		this.moveCounter = 0;
		this.moveCounterMax = config?.moveCounterMax || 4;
		this.frameCounter = 0;
		this.frameCounterMax = 60;

		this.animations = {
			left: {
				fps: 4,
				frames: {
					0: { sx: 0, sy: 0, sw: 10, sh: 10 },
					1: { sx: 10, sy: 0, sw: 10, sh: 10 },
					2: { sx: 0, sy: 0, sw: 10, sh: 10 },
					3: { sx: 10, sy: 0, sw: 10, sh: 10 },
				},
			},
			right: {
				fps: 4,
				frames: {
					0: { sx: 0, sy: 10, sw: 10, sh: 10 },
					1: { sx: 10, sy: 10, sw: 10, sh: 10 },
					2: { sx: 0, sy: 10, sw: 10, sh: 10 },
					3: { sx: 10, sy: 10, sw: 10, sh: 10 },
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

	update(sceneManager, options, gameObjects) {
		const solids = gameObjects.filter(
			(gameObject) =>
				gameObject instanceof Tree || gameObject instanceof Basket,
		);

		if (this.frameCounter >= this.frameCounterMax - 1) {
			this.frameCounter = 0;
		} else {
			this.frameCounter++;
		}

		const hitTree = this.collisions(solids);

		if (hitTree) {
			console.log('Fireball hit a tree!');
		}

		if (this.moveCounter >= this.moveCounterMax) {
			this.moveCounter = 0;

			if (this.animation === 'left') {
				this.dx--;
			} else {
				this.dx++;
			}
		} else {
			this.moveCounter++;
		}
	}

	collisions(objects) {
		for (let i = 0; i < objects.length; i++) {
			if (
				this.dx < objects[i].dx + objects[i].dw &&
				this.dx + this.dw > objects[i].dx &&
				this.dy < objects[i].dy + objects[i].dh &&
				this.dy + this.dh > objects[i].dy
			) {
				this.frameCounter = 0;
				if (this.animation === 'left') {
					this.dx++;
					this.animation = 'right';
				} else {
					this.dx--;
					this.animation = 'left';
				}
			}
		}
	}

	action(monster, player) {
		player.lost = true;
		player.currentAnimation = 'lost';
		player.frameCounter = '0';
	}
}
