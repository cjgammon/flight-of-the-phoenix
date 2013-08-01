/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var Sprite,
		Backbone = require('backbone'),
		Vars = require('app/models/vars');

    Sprite = Backbone.View.extend({
			
		initialize: function (attrs) {
			this.img = attrs.img;
			this.x = attrs.x ? attrs.x : 0;
			this.y = attrs.y ? attrs.y : 0;
			this.w = attrs.w ? attrs.w : attrs.img.width;
			this.h = attrs.h ? attrs.h : attrs.img.height;
			this.frameX = attrs.frameX ? attrs.frameX : 0;
			this.frameY = attrs.frameY ? attrs.frameY : 0;
			this.frameW = attrs.frameW ? attrs.frameW : this.w;
			this.frameH = attrs.frameH ? attrs.frameH : this.h;
			this.rx = attrs.x ? attrs.x : 0; //render x
			this.ry = attrs.y ? attrs.y : 0; //render y
			this.rotation = 0;
		},
		
		render: function () {			
			var ctx = Vars.get('context');
			
			ctx.save();
			ctx.translate(this.rx, this.ry);
			ctx.rotate(this.rotation);
			ctx.translate(-this.frameW / 2, -this.frameH / 2);
			
			ctx.drawImage(this.img, 
				this.frameX, this.frameY, this.frameW, this.frameH, 
				0, 0, this.w, this.h);
			
			ctx.restore();
		}
		
	});
	
	return Sprite;
});