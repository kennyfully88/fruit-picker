'use strict';

class Loader {
	constructor() {
		this.images = {};
		this.sounds = {};
		this.imagesLoaded = false;
		this.soundsLoaded = false;
	}

	loadImages = async (imageNames) => {
		const images = await Promise.all(
			imageNames.map(
				(name) =>
					new Promise((resolve) => {
						const img = new Image();
						img.onload = () => resolve(img);
						img.src = `assets/image/${name}.png`;
					}),
			),
		);

		this.images = imageNames.reduce((acc, name, index) => {
			acc[name] = images[index];
			return acc;
		}, {});

		this.imagesLoaded = true;
	};

	loadSounds = async (soundNames) => {
		const sounds = await Promise.all(
			soundNames.map(
				(name) =>
					new Promise((resolve) => {
						const sound = new Howl({
							src: [`assets/sounds/${name}.m4a`],
							loop: true,
							onload: () => resolve(sound),
						});
					}),
			),
		);

		this.sounds = soundNames.reduce((acc, name, index) => {
			acc[name] = sounds[index];
			return acc;
		}, {});

		this.soundsLoaded = true;

		sceneManager.addScene(new TitleScene());
		sceneManager.addScene(new LevelSelectScene());
		sceneManager.init({
			gameBox: gameBox,
			ctx: gameBox.ctx,
			controls: controls,
		});
	};
}
