/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var DisplayObjectContainer,
		Backbone = require('backbone');

    DisplayObjectContainer = Backbone.View.extend({
			
		initialize: function () {
			this.children = [];
			this.x = 0;
			this.y = 0;
		},
		
		render: function () {
			var i = 0;
			
			for (i; i < this.children.length; i += 1) {
				this.children[i].rx = this.x + this.children[i].x;
				this.children[i].ry = this.y + this.children[i].y;
				this.children[i].render();
			}
		},
		
		addChild: function (_child) {
			this.children.push(_child);
		},
		
		removeChild: function (_child) {
			for (var i = 0; i < this.children.length; i += 1) {
				if (this.children[i] == _child) {
					this.children.splice(i, 1);
					break;
				}
			}
		}
		
	});
	
	return DisplayObjectContainer;
});