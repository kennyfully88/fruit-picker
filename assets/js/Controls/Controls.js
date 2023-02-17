'use strict';

class Controls {
	constructor(config) {
		this.touchPurePos = config?.touchPurePos || { x: null, y: null };
		this.touchPos0 = config?.touchPos || { x: 0, y: 0 };
		this.touchPos1 = config?.touchPos || { x: 0, y: 0 };
		this.touchPos2 = config?.touchPos || { x: 0, y: 0 };
		this.touchPos3 = config?.touchPos || { x: 0, y: 0 };
		this.touchPos4 = config?.touchPos || { x: 0, y: 0 };
		this.touchActive = false;
		this.identifierArray = [];
	}

	setTouchControls(gameBox, ctx) {
		gameBox.addEventListener('mousedown', (e) => {
			this.getPos(e, gameBox, ctx);
			this.touchActive = true;
		});

		gameBox.addEventListener('mousemove', (e) => {
			this.getPos(e, gameBox, ctx);
		});

		gameBox.addEventListener('mouseup', (e) => {
			this.getPos(e, gameBox, ctx);
			this.touchActive = false;
		});

		// Touch events
		gameBox.addEventListener('touchstart', (e) => {
			e.preventDefault();
			this.getPos(e, gameBox, ctx, 'touchStart');
			this.touchActive = true;
		});

		gameBox.addEventListener('touchmove', (e) => {
			this.getPos(e, gameBox, ctx);
		});

		gameBox.addEventListener('touchend', (e) => {
			// this.getPos(e, gameBox, ctx);
			this.touchActive = false;
		});
	}

	getPos = (e, gameBox, ctx, eventType) => {
		const rect = gameBox.getBoundingClientRect();

		if (e.clientX && e.clientY) {
			const touchX = Math.floor(
				(e.clientX - rect.left) / (ctx.canvas.clientWidth * 0.01),
			);

			const touchY = Math.floor(
				(e.clientY - rect.top) / (ctx.canvas.clientHeight * 0.01),
			);

			this[`touchPos${0}`].x = Math.floor(touchX / 10) * 10;
			this[`touchPos${0}`].y = Math.floor(touchY / 10) * 10;

			// Used for the level menu
			this.touchPurePos.x = Math.floor(touchX);
			this.touchPurePos.y = Math.floor(touchY);
		} else {
			for (let i = 0; i < Object.values(e.touches).length; i++) {
				const touchX = Math.floor(
					(Object.values(e.touches)[i].clientX - rect.left) /
						(ctx.canvas.clientWidth * 0.01),
				);

				const touchY = Math.floor(
					(Object.values(e.touches)[i].clientY - rect.top) /
						(ctx.canvas.clientHeight * 0.01),
				);

				this[`touchPos${i}`].x = Math.floor(touchX / 10) * 10;
				this[`touchPos${i}`].y = Math.floor(touchY / 10) * 10;

				// Used for the level menu
				this.touchPurePos.x = Math.floor(touchX);
				this.touchPurePos.y = Math.floor(touchY);
			}

			// okay code
			if (e.clientX) {
				const touchX = Math.floor(
					(e.clientX - rect.left) / (ctx.canvas.clientWidth * 0.01),
				);

				const touchY = Math.floor(
					(e.clientY - rect.top) / (ctx.canvas.clientHeight * 0.01),
				);
				// standard
				this.touchPos.x = Math.floor(touchX / 10) * 10;
				this.touchPos.y = Math.floor(touchY / 10) * 10;
			}
		}
	};
}
