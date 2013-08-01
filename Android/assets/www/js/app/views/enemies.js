/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var Enemies,
		DisplayObjectContainer = require('app/views/display-object-container'),
		Sprite = require('app/views/sprite'),
		SpriteAnimation = require('app/views/sprite-animation'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list');
	
	Enemies = DisplayObjectContainer.extend({
	    
		initialize: function () {
			var i,
				sprite;
			
			DisplayObjectContainer.prototype.initialize.call(this);	
			
			this.delta = 0;
			this.sprites = [];
			this.route = Math.floor(Math.random() * 2);
			
			for (i = 0; i < 3; i += 1) {
				var _x, _y;
				
				if (this.route == 0) {
					_x = i * 200;
					_y = Math.cos(i) * 100;
				} if (this.route == 1) {
					_x = 0;
					_y = (Math.round(this.sprites.length / 2) - i) * 50;
				}

				sprite = new SpriteAnimation({
					img: AssetList.LIST[8].img, 
					x: 0, y: 0, 
					w: 107, h: 62,
					columns: 4,
					rows: 12,
					animationStart: 0,
					animationEnd: 30
				});
				
				this.addChild(sprite);
				this.sprites.push(sprite);
			}
			
		},
			
		render: function () {
			var i;
			
			this.delta += 0.05;
						
			for (i = 0; i < this.sprites.length; i += 1) {
				
				if (this.route == 0) {
					this.sprites[i].y = Math.sin(this.delta + i * 10) * 150;
				} else if (this.route == 1){
					this.sprites[i].y += (Math.round(this.sprites.length / 2) - i) * (1.5 / this.delta);
				}
			}
			
			DisplayObjectContainer.prototype.render.call(this);	
		}
	});

	return Enemies;
});