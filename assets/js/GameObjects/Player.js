'use strict';

class Player {
	constructor(config) {
		this._rng = String(Math.floor(Math.random() * 100)).padEnd(3, '0');
		this._id = `player_${new Date().getTime()}${this._rng}`;
		this.image = config?.image || loader.images.player;
		this.dx = config?.dx || 0;
		this.dy = config?.dy || 0;
		this.dw = config?.dw || 10;
		this.dh = config?.dh || 10;
		this.direction = config?.direction || 'left';
		this.frameCounter = 0;
		this.frameCounterMax = 60;
		this.currentAnimation = config?.animation || 'left';
		this.lost = false;

		this.animations = {
			up: {
				fps: 2,
				frames: {
					0: { sx: 0, sy: 0, sw: 10, sh: 10 },
					1: { sx: 10, sy: 0, sw: 10, sh: 10 },
				},
			},
			down: {
				fps: 2,
				frames: {
					0: { sx: 0, sy: 10, sw: 10, sh: 10 },
					1: { sx: 10, sy: 10, sw: 10, sh: 10 },
				},
			},
			left: {
				fps: 2,
				frames: {
					0: { sx: 0, sy: 20, sw: 10, sh: 10 },
					1: { sx: 10, sy: 20, sw: 10, sh: 10 },
				},
			},
			right: {
				fps: 2,
				frames: {
					0: { sx: 0, sy: 30, sw: 10, sh: 10 },
					1: { sx: 10, sy: 30, sw: 10, sh: 10 },
				},
			},
			lost: {
				fps: 1,
				frames: {
					0: { sx: 0, sy: 40, sw: 10, sh: 10 },
				},
			},
		};
	}

	render(ctx) {
		const currentFrame = Math.floor(
			this.frameCounter /
				(this.frameCounterMax / this.animations[this.currentAnimation].fps),
		);

		if (this.currentAnimation === 'lost') {
			ctx.drawImage(
				this.image,
				this.animations[this.currentAnimation].frames[currentFrame].sx,
				this.animations[this.currentAnimation].frames[currentFrame].sy,
				this.animations[this.currentAnimation].frames[currentFrame].sw,
				this.animations[this.currentAnimation].frames[currentFrame].sh,
				this.dx,
				this.dy,
				this.dw,
				this.dh,
			);
			gameLogic.gameOver = true;
			return;
		}

		this.currentAnimation = this.direction;

		ctx.drawImage(
			this.image,
			this.animations[this.currentAnimation].frames[currentFrame].sx,
			this.animations[this.currentAnimation].frames[currentFrame].sy,
			this.animations[this.currentAnimation].frames[currentFrame].sw,
			this.animations[this.currentAnimation].frames[currentFrame].sh,
			this.dx,
			this.dy,
			this.dw,
			this.dh,
		);
	}

	update(sceneManager, options, objects) {
		if (
			!controls.touchPos0.x ||
			!controls.touchPos0.y ||
			!controls.touchPurePos.x ||
			!controls.touchPurePos.y
		)
			return;

		if (this.frameCounter >= this.frameCounterMax - 1) {
			this.frameCounter = 0;
		} else {
			this.frameCounter++;
		}

		//　determine direction
		if (options.controls.touchPos0.y < this.dy) {
			this.direction = 'up';
		}

		if (options.controls.touchPos0.y > this.dy) {
			this.direction = 'down';
		}

		if (options.controls.touchPos0.x < this.dx) {
			this.direction = 'left';
		}

		if (options.controls.touchPos0.x > this.dx) {
			this.direction = 'right';
		}

		// check movement
		if (this.direction === 'up') {
			if (options.controls.touchPos0.y != this.dy) {
				this.dy--;
			}
		}

		if (this.direction === 'down') {
			if (options.controls.touchPos0.y != this.dy) {
				this.dy++;
			}
		}

		if (this.direction === 'left') {
			if (options.controls.touchPos0.x != this.dx) {
				this.dx--;
			}
		}

		if (this.direction === 'right') {
			if (options.controls.touchPos0.x != this.dx) {
				this.dx++;
			}
		}

		this.collisions(objects);
	}

	collisions(objects) {
		for (let i = 0; i < objects.length; i++) {
			for (let j = 0; j < objects[i].length; j++) {
				if (
					this.dx < objects[i][j].dx + objects[i][j].dw &&
					this.dx + this.dw > objects[i][j].dx &&
					this.dy < objects[i][j].dy + objects[i][j].dh &&
					this.dy + this.dh > objects[i][j].dy
				) {
					objects[i][j].action(objects[i], this);
				}
			}
		}
	}
}
