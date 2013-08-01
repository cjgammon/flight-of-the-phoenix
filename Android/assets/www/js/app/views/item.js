/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var Enemy,
		DisplayObjectContainer = require('app/views/display-object-container'),
		Sprite = require('app/views/sprite'),
		SpriteAnimation = require('app/views/sprite-animation'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list');

    Enemy = DisplayObjectContainer.extend({

		initialize: function () {
			DisplayObjectContainer.prototype.initialize.call(this);	
			
			this.type = Math.floor(Math.random() * 2);
			
			if (this.type == 0) {
				this.start = 0;
				this.end = 8;
			} else {
				this.start = 9;
				this.end = 17;
			}
			
			this.sprite = new SpriteAnimation({
				img: AssetList.LIST[9].img, 
				x: 0, y: 0, 
				w: 86, h: 86,
				columns: 5,
				rows: 4,
				animationStart: this.start,
				animationEnd: this.end
			});
			
			this.sprite.gotoAndStop(this.start);
			this.addChild(this.sprite);			
		},
		
		render: function () {
			DisplayObjectContainer.prototype.render.call(this);
		}
		
	});
	
	return Enemy;
});