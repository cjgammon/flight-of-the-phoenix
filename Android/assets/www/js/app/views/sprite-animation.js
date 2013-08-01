/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var SpriteAnimation,
		Sprite = require('app/views/sprite'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list');

    SpriteAnimation = Sprite.extend({

		initialize: function (attrs) {
			Sprite.prototype.initialize.call(this, attrs);
			this.delta = 0;
			this.columns = attrs.columns ? attrs.columns : 0;
			this.rows = attrs.rows ? attrs.rows : 0;
			this.frame = attrs.frame ? attrs.frame : 0;
			this.speed = attrs.speed ? attrs.speed : 1;
			this.animationStart = attrs.animationStart ? attrs.animationStart : 0;
			this.animationEnd = attrs.animationEnd ? attrs.animationEnd : 0;
		},
		
		render: function () {
			this.animate();
			Sprite.prototype.render.call(this);
		},
		
		animate: function () {
			
			if (this.paused) {
				return;
			}
			
			if (this.delta % 2 == 0) {
				this.frameX += this.w;
				
				if (this.frameX > this.w * this.columns - 1) {
					this.frameX = 0;
					this.frameY += this.h;
				}
				
				this.frame += 1;
				
				if (this.frame == this.animationEnd) {
					if (this.callback) {
						this.paused = true;
						this.callback();
						return;
					}
					this.frame = this.animationStart;
					this.frameX = (this.frame % this.columns) * this.w;
					this.frameY = (this.frame % this.rows) * this.h;
				}
			}
			
			this.delta += 1;
		},
		
		gotoAndPlay: function (start, end, callback) {
			this.paused = false;
			
			this.animationStart = start;
			this.animationEnd = end;
			
			this.frame = this.animationStart;
			this.frameX = (this.frame % this.columns) * this.w;
			this.frameY = (this.frame % this.rows) * this.h;
			
			this.callback = callback || false;
		},
		
		gotoAndStop: function (frame) {
			this.paused = true;
			this.callback = false;
			
			this.frame = frame;
			this.frameX = (this.frame % this.columns) * this.w;
			this.frameY = (this.frame % this.rows) * this.h;	
		},
		
		currentFrame: function () {
			return this.frame;
		},
		
		pause: function () {
			this.paused = true;
		},
		
		play: function (callback) {
			this.paused = false;
			this.callback = callback;
		}
		
	});
	
	return SpriteAnimation;
});