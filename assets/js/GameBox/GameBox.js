'use strict';

class GameBox {
	constructor(config) {
		this.gameBoxContainer =
			config?.gameBoxContainer || document.querySelector('.game-box-container');
		this.gameBox = config?.gameBox || document.querySelector('.game-box');
		this.ctx = this.gameBox.getContext('2d');
		this.fruitsLabel =
			config?.fruitsLabel || document.querySelector('.fruits-label');
	}
}
