'use strict';

class LevelSelectScene extends Scene {
	constructor() {
		super();
		this.name = 'level-select';
		this.image = loader.images.level;
		this.selectedLevel = 1;
		this.levelsArray = [];
		this.levelsSetted = false;
		this.fadeInOut = new FadeInOut({ mode: 'fadeOut' });

		loader.sounds['menu'].play();
	}

	preRender(options) {
		if (!this.levelsSetted) {
			this.levelsSetted = true;
			this.setLevels(options);
		}
	}

	render(options) {
		this.levelsArray.forEach((level) => {
			level.render(options.ctx);
		});

		this.fadeInOut.renderAlpha(options.ctx);
	}

	update(sceneManager, options) {
		if (this.fadeInOut.active) {
			if (this.fadeInOut.alpha <= 1) {
				this.fadeInOut.fadeOut();
			} else {
				switch (this.selectedLevel) {
					case 1:
						sceneManager.addScene(new Level01Scene());
						break;
					case 2:
						sceneManager.addScene(new Level02Scene());
						break;
					case 3:
						sceneManager.addScene(new Level03Scene());
						break;
					case 4:
						sceneManager.addScene(new Level04Scene());
						break;
					case 5:
						sceneManager.addScene(new Level05Scene());
						break;
					case 6:
						sceneManager.addScene(new Level06Scene());
						break;
					case 7:
						sceneManager.addScene(new Level07Scene());
						break;
					case 8:
						sceneManager.addScene(new Level08Scene());
						break;
					case 9:
						sceneManager.addScene(new Level09Scene());
						break;
					case 10:
						sceneManager.addScene(new Level10Scene());
						break;
					default:
						sceneManager.addScene(new Level01Scene());
				}

				sceneManager.currentScene = `level-${
					this.selectedLevel < 10 ? '0' : ''
				}${this.selectedLevel}`;

				controls.touchPos0.x = null;
				controls.touchPos0.y = null;
				controls.touchPurePos.x = null;
				controls.touchPurePos.y = null;
			}
		}

		for (let i = 0; i < this.levelsArray.length; i++) {
			this.levelsArray[i].update(sceneManager, options, this);
		}
	}

	setLevels(options) {
		gameLogic.levels.forEach((level) => {
			this.levelsArray.push(
				new LevelButton({ level: level.id, unlocked: level.unlocked }),
			);
		});

		if (options.controls.active) {
			options.controls.active = false;
		}
	}
}
