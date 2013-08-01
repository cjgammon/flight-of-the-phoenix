/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var Hero,
		DisplayObjectContainer = require('app/views/display-object-container'),
		SpriteAnimation = require('app/views/sprite-animation'),
		Sprite = require('app/views/sprite'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list');
	
	Hero = DisplayObjectContainer.extend({
	    
		initialize: function () {
			DisplayObjectContainer.prototype.initialize.call(this);	
			
			this.sprite = new SpriteAnimation({
				img: AssetList.LIST[1].img, 
				x: 0, y: 0, 
				w: 141, h: 102,
				columns: 7,
				rows: 7,
				animationStart: 0,
				animationEnd: 45
			});
			
			this.addChild(this.sprite);
		},
			
		render: function () {
			DisplayObjectContainer.prototype.render.call(this);	
		}
	});

	return Hero;
});