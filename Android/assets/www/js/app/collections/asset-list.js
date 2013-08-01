/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var AssetList;
	
	AssetList = function () {
		
		var LOAD_COUNT = 0;
		
		this.LIST = [
			{url: 'assets/images/bgGame.jpg', frameW: 792, frameH: 612},
			{url: 'assets/images/hero.png'},
			{url: 'assets/images/bgGame2.png', frameW: 582, frameH: 536},
			{url: 'assets/images/bgGame3.png', frameW: 582, frameH: 536},
			{url: 'assets/images/bgGame4.png', frameW: 1916, frameH: 664},
			{url: 'assets/images/spritesheet.png'},
			{url: 'assets/images/enemy.png'},
			{url: 'assets/images/enemy_die.png'},
			{url: 'assets/images/enemy_full.png'},
			{url: 'assets/images/items.png'},
		],
		
		this.load = function (callback) {
			var i;
				
			this.callback = callback;
			
			for (i = 0; i < this.LIST.length; i += 1) {
				var img = FastCanvas.createImage();
				this.LIST[i].img = img;
				img.src = this.LIST[i].url;
				img.onload = this.handle_img_LOAD();				
			}
		};
		
		this.handle_img_LOAD = function () {
			LOAD_COUNT += 1;
			if (LOAD_COUNT == this.LIST.length) {
				this.callback();
			}
		};
	}
	
	return new AssetList();
});