'use strict';

const util = new Util();
const gameBox = new GameBox();
const loader = new Loader();
const gameLogic = new GameLogic();
const controls = new Controls();
const sceneManager = new SceneManager();

controls.setTouchControls(gameBox.gameBox, gameBox.ctx);

loader.loadImages([
	'title',
	'tree',
	'ground',
	'toucher',
	'player',
	'monster',
	'fruit',
	'basket',
	'level',
	'gameOverText',
	'youWinText',
	'fireball',
]);
loader.loadSounds([
	'fruit-picker',
	'game-over',
	'pickup',
	'menu',
	'select',
	'basket',
]);
