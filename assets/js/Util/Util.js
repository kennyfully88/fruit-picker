'use strict';

class Util {
	constructor() {
		window.addEventListener('resize', () => {
			this.resizeHeight();
		});
		this.resizeHeight();
	}

	resizeHeight = () => {
		// This fixes the website height problem on iOS
		document.body.style.height = `${window.innerHeight}px`;
	};
}
