/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var Enemy,
		DisplayObjectContainer = require('app/views/display-object-container'),
		Sprite = require('app/views/sprite'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list');

    Enemy = DisplayObjectContainer.extend({

		initialize: function () {
			DisplayObjectContainer.prototype.initialize.call(this);	
			
			/*
			this.sprite = new Sprite({
				img: AssetList.LIST[6].img, 
				x: 0, y: 0, 
				w: 73, h: 123
			});
			*/
			this.sprite = new SpriteAnimation({
				img: AssetList.LIST[6].img, 
				x: 0, y: 0, 
				w: 107, h: 61,
				columns: 3,
				animationStart: 0,
				animationEnd: 30
			});
			this.addChild(this.sprite);	
			
			//this.delta = Math.random() * 100;
			//this.speed = 100 + Math.random() * 500;	
		},
		
		render: function () {
			DisplayObjectContainer.prototype.render.call(this);	
		}
		
	});
	
	return Enemy;
});