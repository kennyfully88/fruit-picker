'use strict';

class TitleScene extends Scene {
	constructor() {
		super();
		this.name = 'title-scene';
		this.background = loader.images.title;
		this.fadeInOut = new FadeInOut({ mode: 'fadeOut' });
	}

	render(options) {
		options.ctx.drawImage(this.background, 0, 0);
		this.fadeInOut.renderAlpha(options.ctx);
	}

	update(sceneManager, options) {
		if (options.controls.touchActive || this.fadeInOut.active) {
			this.fadeInOut.active = true;
			if (this.fadeInOut.alpha <= 1) {
				this.fadeInOut.fadeOut();
			} else {
				sceneManager.currentScene = 'level-select';
			}
		}
	}
}
