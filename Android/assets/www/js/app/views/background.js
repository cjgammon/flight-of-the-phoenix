/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var Background,
		DisplayObjectContainer = require('app/views/display-object-container'),
		Sprite = require('app/views/sprite'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list');

    Background = DisplayObjectContainer.extend({

		initialize: function () {
			DisplayObjectContainer.prototype.initialize.call(this);	

			this.layer1 = [];
			this.layer2 = [];
			this.layer3 = [];
			this.layer4 = [];
			
			this.addLayer(this.layer1, AssetList.LIST[0]);
			//this.addLayer(this.layer4, AssetList.LIST[4]);
			this.addLayer(this.layer2, AssetList.LIST[2]);
			this.addLayer(this.layer3, AssetList.LIST[3]);
		},
		
		addLayer: function (array, asset) {
			var _x = -asset.frameW,
				_y = 0, //-asset.frameH
				j, i, 
				bg;
				
			j = 0;
			for (i = 0; i < 3; i += 1) { //10
				
				bg = new Sprite({img: asset.img, w: asset.frameW, h: asset.frameH});
				bg.x = _x;
				bg.y = _y;
				this.addChild(bg);
				array.push(bg);
			
				j += 1;
				_x += bg.w;
				/*
				if (j % 3 === 0) {
					_x = -bg.w;
					_y += bg.h;
				}
				*/
			}
		},

		render: function () {
			DisplayObjectContainer.prototype.render.call(this);	
		},
		
		update: function (delta) {
			this.updateLayer(this.layer1, delta * 0.2);
			//this.updateLayer(this.layer4, delta * 0.3);
			this.updateLayer(this.layer2, delta * 0.5);
			this.updateLayer(this.layer3, delta * 0.9);
		},
		
		updateLayer: function (array, delta) {
			var i, panel;
			
			for (i = 0; i < array.length; i += 1) {
				panel = array[i];
				panel.x -= delta;
				
				if (panel.x < -panel.w * 1.5) {
					panel.x += panel.w * 3;
				}
			}
		}
		
	});
	
	return Background;
});