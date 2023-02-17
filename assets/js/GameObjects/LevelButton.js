'use strict';

class LevelButton {
	constructor(config) {
		this._rng = String(Math.floor(Math.random() * 100)).padEnd(3, '0');
		this._id = `level-button_${new Date().getTime()}${this._rng}`;
		this.image = config?.image || loader.images.level;
		this.level = config?.level || 1;
		this.unlocked = config?.unlocked || false;
		this.activePress = false;

		this.dx = config?.dx || ((this.level - 1) % 4) * 25;
		this.dy = config?.dy || Math.floor((this.level - 1) / 4) * 25;
		this.dw = config?.dw || 25;
		this.dh = config?.dh || 25;

		this.currentAnimation = config?.animation || 'locked';

		this.animations = {
			default: {
				frames: {
					0: { sx: 0, sy: (this.level - 1) * 25, sw: 25, sh: 25 },
				},
			},
			active: {
				frames: {
					0: { sx: 25, sy: (this.level - 1) * 25, sw: 25, sh: 25 },
				},
			},
			locked: {
				frames: {
					0: { sx: 0, sy: 250, sw: 25, sh: 25 },
				},
			},
			lockedActive: {
				frames: {
					0: { sx: 25, sy: 250, sw: 25, sh: 25 },
				},
			},
		};

		controls.touchPurePos.x = null;
		controls.touchPurePos.y = null;
		controls.touchPos0.x = null;
		controls.touchPos0.y = null;
	}

	preRender(options) {}

	render(ctx) {
		ctx.drawImage(
			this.image,
			this.animations[this.currentAnimation].frames[0].sx,
			this.animations[this.currentAnimation].frames[0].sy,
			this.animations[this.currentAnimation].frames[0].sw,
			this.animations[this.currentAnimation].frames[0].sh,
			this.dx,
			this.dy,
			this.dw,
			this.dh,
		);
	}

	update(sceneManager, options, levelSelect) {
		if (
			options.controls.touchActive &&
			this.unlocked &&
			this.currentAnimation === 'active'
		) {
			levelSelect.fadeInOut.active = true;
		}

		const touchX = options.controls.touchPurePos.x;
		const touchY = options.controls.touchPurePos.y;

		if (
			touchX > this.dx &&
			touchX < this.dx + this.dw &&
			touchY > this.dy &&
			touchY < this.dy + this.dh
		) {
			if (!this.activePress) {
				this.activePress = true;
				loader.sounds['select']._loop = false;
				loader.sounds['select'].play();
			}

			if (!this.unlocked) {
				this.currentAnimation = 'lockedActive';
			} else {
				this.currentAnimation = 'active';
				levelSelect.selectedLevel = this.level;
			}
		} else {
			if (!this.unlocked) {
				this.currentAnimation = 'locked';
			} else {
				this.currentAnimation = 'default';
			}
		}
	}
}
