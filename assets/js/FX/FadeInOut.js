'use strict';

class FadeInOut {
	constructor(config) {
		this.mode = config.mode;
		this.active = false;
		this.alpha = 0;

		if (this.mode === 'fadeIn') {
			this.alpha = 1;
		} else {
			this.alpha = 0;
		}
	}

	fadeIn() {
		this.alpha -= 0.03;
	}

	fadeOut() {
		this.alpha += 0.03;
	}

	renderAlpha(ctx) {
		ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha})`;

		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
}
