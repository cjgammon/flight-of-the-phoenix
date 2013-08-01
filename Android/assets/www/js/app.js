/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var App,
		Backbone = require('backbone'),
		Stage = require('app/views/stage'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list');

	require('fastcanvas');
	require('cordova');
	require('raf');
	require('stats');

    App = Backbone.View.extend({
	
        initialize: function () {
			this.FORCE_HTML_CANVAS = false;
			this.DEBUG = false;
	
			if (this.DEBUG) {
				this.stats = new Stats();
				this.stats.setMode(0); // 0: fps, 1: ms
				this.stats.domElement.style.position = 'absolute';
				this.stats.domElement.style.left = '0px';
				this.stats.domElement.style.top = '0px';
				this.stats.domElement.style.zIndex = '1000';
				document.body.appendChild(this.stats.domElement);
			}
	
			this.readyTimeoutID = setTimeout(this.handle_DEVICE_READY_TIMEOUT.bind(this), 2000);
			document.addEventListener("deviceready", this.handle_DEVICE_READY.bind(this), false);
    	},

		ready: function () {
			this.canvas = FastCanvas.create(this.FORCE_HTML_CANVAS);
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			
			this.ctx = this.canvas.getContext("2d");
			Vars.set('context', this.ctx)
						
			AssetList.load(this.handle_LOAD_COMPLETE.bind(this));
		},

		start: function () {
			this.stage = new Stage();
			requestAnimationFrame(this.render.bind(this));
		},
		
        render: function () {
			if (this.DEBUG) {
				this.stats.begin();
			}
	
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.stage.render();
			FastCanvas.render();
			
			if (this.DEBUG) {
				this.stats.end();
			}
			
   			requestAnimationFrame(this.render.bind(this));
        },

		handle_DEVICE_READY: function () {
			clearTimeout(this.readyTimeoutID);
			this.ready();
		},
		
		handle_DEVICE_READY_TIMEOUT: function () {
			this.ready();
		},
		
		handle_LOAD_COMPLETE: function () {
			this.start();
		}

    });

	return new App();
});
