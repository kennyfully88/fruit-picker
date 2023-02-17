'use strict';

class Tree {
	constructor(config) {
		this._rng = Math.ceil(Math.random() * 100);
		this.image = config?.image || loader.images.tree;
		this.dx = config?.dx || 0;
		this.dy = config?.dy || 0;
		this.dw = config?.dw || 10;
		this.dh = config?.dh || 10;
	}

	render(ctx) {
		ctx.fillStyle = ctx.createPattern(this.image, 'repeat');
		ctx.fillRect(this.dx, this.dy, this.dw, this.dh);
	}

	update() {}

	action(objects, player) {
		if (player.direction === 'up') player.dy++;
		if (player.direction === 'down') player.dy--;
		if (player.direction === 'left') player.dx++;
		if (player.direction === 'right') player.dx--;
	}
}
