'use strict';

class GameLogic {
	constructor(config) {
		this.currentLevel = 0;
		this.fruits = config?.fruits || 0;
		this.levelInited = false;
		this.levelCleared = false;
		this.gameOver = false;
		this.gameOverPlaying = false;

		this.menuPlaying = false;

		const savedLevelData = JSON.parse(localStorage.getItem('levels'));

		this.levels = savedLevelData || [
			{ id: 1, unlocked: true },
			{ id: 2, unlocked: false },
			{ id: 3, unlocked: false },
			{ id: 4, unlocked: false },
			{ id: 5, unlocked: false },
			{ id: 6, unlocked: false },
			{ id: 7, unlocked: false },
			{ id: 8, unlocked: false },
			{ id: 9, unlocked: false },
			{ id: 10, unlocked: false },
		];
	}

	levelResultRender(options, level) {
		if (this.gameOver || this.levelCleared) {
			options.ctx.fillStyle = `rgba(0, 0, 0, ${level.fadeInOut})`;
			options.ctx.fillRect(0, 0, 100, 100);
			level.player.render(options.ctx);

			if (this.gameOver) {
				options.ctx.drawImage(
					loader.images.gameOverText,
					Math.floor(options.ctx.canvas.width / 2 - 42),
					Math.floor(options.ctx.canvas.height / 2 - 6),
				);
			} else {
				options.ctx.drawImage(
					loader.images.youWinText,
					Math.floor(options.ctx.canvas.width / 2 - 35),
					Math.floor(options.ctx.canvas.height / 2 - 7),
				);
			}
			return true;
		}
	}

	levelResultUpdate(level) {
		if (!this.levelInited) {
			this.levelInited = true;
			loader.sounds['menu'].stop();
			loader.sounds['game-over'].stop();
			loader.sounds['fruit-picker'].play();
		}

		if (this.gameOver || this.levelCleared) {
			loader.sounds['menu'].stop();
			loader.sounds['fruit-picker'].stop();
			if (this.gameOver && !this.gameOverPlaying) {
				this.gameOverPlaying = true;
				loader.sounds['game-over'].play();
			}

			if (level.fadeInOut < 1) {
				level.fadeInOut += 0.01;
			} else {
				loader.sounds['game-over'].stop();
				this.gameOver = false;
				this.gameOverPlaying = false;
				this.levelCleared = false;
				this.levelInited = false;
				this.fruits = 0;
				localStorage.setItem('levels', JSON.stringify(this.levels));
				sceneManager.addScene(new LevelSelectScene());
				sceneManager.currentScene = 'level-select';
			}

			return true;
		}
	}
}
