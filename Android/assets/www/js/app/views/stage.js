/*global define $ requestAnimationFrame*/

define([], function (require) {
	
	var Stage,
		Sprite = require('app/views/sprite'),
		DisplayObjectContainer = require('app/views/display-object-container'),
		Hero = require('app/views/hero'),
		Item = require('app/views/item'),
		Enemies = require('app/views/enemies'),
		Background = require('app/views/background'),
		AssetList = require('app/collections/asset-list');

	require('tweenmax');

    Stage = DisplayObjectContainer.extend({
		
		initialize: function () {
			DisplayObjectContainer.prototype.initialize.call(this);
			
			this.speed = 10;
			this.automating = false;
			this.delta = 0;
			this.mouse = {x: 0, y: 0};
			this.mouseDelta = {x: 0, y: 0};
			this._x = 0;
			this.velocityX = 0;
			this.velocityY = 0;
			
			this.bg = new Background();
			this.bg.x = window.innerWidth / 2;
			this.bg.y = window.innerHeight / 2;
			this.addChild(this.bg);
			
			this.hero = new Hero();
			this.hero.x = window.innerWidth / 3;
			this.hero.y = window.innerHeight / 2;
			this.addChild(this.hero);
			
			this.generatePath();
			
			this.particles = [];
			
			this.items = [];
			this.itemPathState = 0;
			
			for (var i = 0; i < 10; i += 1) {
				var item = new Item();
				item.x = this._x + this.path[this.itemPathState].x;
				item.y = this.path[this.itemPathState].y;
				
				this.addChild(item);
				this.items.push(item);
				this.itemPathState += 1;
			}
			
			this.addEnemyGroup();
			
			document.addEventListener('mousedown', this.handle_MOUSE_DOWN.bind(this));
			document.addEventListener('mousemove', this.handle_MOUSE_MOVE.bind(this));
			document.addEventListener('mouseup', this.handle_MOUSE_UP.bind(this));
			
			document.addEventListener('touchstart', this.handle_TOUCH_START.bind(this));
			document.addEventListener('touchmove', this.handle_TOUCH_MOVE.bind(this));
			document.addEventListener('touchend', this.handle_TOUCH_END.bind(this));
		},
		
		press: function (x, y) {
			this.mouseDelta.x = x;
			this.mouse.y = y;
			this.dragging = true;
		},
		
		drag: function (x, y) {
			if (this.dragging) {
				var diffX = Math.abs(this.mouseDelta.x - x);
				
				this.mouse.x = diffX;
				this.mouse.y = y;
			}
		},
		
		release: function () {
			this.mouse.x = this.speed;
			this.dragging = false;
		},
		
		handle_MOUSE_DOWN: function (e) {
			this.press(e.pageX, e.pageY);
		},
		
		handle_MOUSE_MOVE: function (e) {
			this.drag(e.pageX, e.pageY);
		},
		
		handle_MOUSE_UP: function () {
			this.release();
		},
		
		handle_TOUCH_START: function (e) {
			this.press(e.touches[0].pageX, e.touches[0].pageY);
		},
		
		handle_TOUCH_MOVE: function (e) {
			this.drag(e.touches[0].pageX, e.touches[0].pageY);
		},
		
		handle_TOUCH_END: function () {
			this.release();
		},
		
		/*
		handleOrientation: function (e) {			
			var a = e.alpha,
				b = e.beta,
				g = e.gamma;
		},
		
		handleMotion: function (e) {
			this.automating = false;
			
			var accelY = -5 + e.accelerationIncludingGravity.y;
			this.velocityY += accelY;
			
			if (this.hero.y + this.velocityY > window.innerHeight) {
				this.velocityY = 0;
			} else if (this.hero.y + this.velocityY < 0) {
				this.velocityY = 0;
			}
			
			this.hero.y += this.velocityY;
		},
		*/
		render: function () {
			var instance = this;
				
			this.delta += 0.1;
			//this._x -= this.speed;
			
			if (this.automating) {
				this.hero.y = (window.innerHeight / 2) + Math.sin(new Date().getTime() / 1000) * 100;
			} else if (this.dragging) {
				this.velocityX -= (this.speed - this.mouse.x) * 0.1;
				this.velocityY = (this.hero.y - this.mouse.y) * 0.1;
				this.hero.y -= this.velocityY;
			} else {
				this.velocityX = this.velocityX > this.speed ? this.velocityX * 0.99 : this.speed;
			}
			
			this._x -= this.velocityX;
			this.bg.update(this.velocityX);
			
			//ENEMIES
			if (this.enemyGroup) {
				this.enemyGroup.x -= this.velocityX;
				if (this.enemyGroup.x < -1000) {
					this.removeChild(this.enemyGroup);
					this.addEnemyGroup();
				}

				for (var i = 0; i < this.enemyGroup.children.length; i += 1) {
					var child = this.enemyGroup.children[i],
						_x = this.enemyGroup.x + child.x,
						_y = this.enemyGroup.y + child.y,
						point = {x: _x, y: _y};
					
					if (this.collides(this.hero, point, 50)) {
						//damage
						child.gotoAndPlay(31, 43, function () {
							instance.enemyGroup.removeChild(child); //TODO:: removing wrong child
						});
						break;
					}
				}
			}
			
			//ITEMS
			for (var i = 0; i < this.items.length; i += 1) {

				var item = this.items[i];
				item.x -= this.velocityX;

				if (item.x < -100) {
					this.updateItem(item);
				}
				
				if (this.collides(this.hero, item, 50)) {
					item.sprite.gotoAndPlay(item.start, item.end, function () {
						instance.updateItem(item);
					});
				}
			}
			
			//PARTICLES
			/*
			if (Math.round(this.delta) % 1 == 0) {
				this.addParticle();
			}
			
			for (var i = 0; i < this.particles.length; i += 1) {
				this.particles[i].x -= speed;
				if (this.particles[i].x < -50) {
					this.removeChild(this.particles[i]);
					this.particles.splice(i, 1);
				}
			}
			*/

			DisplayObjectContainer.prototype.render.call(this);	
		},
		
		updateItem: function (item) {
			item.x = this._x + this.path[this.itemPathState].x;
			item.y = this.path[this.itemPathState].y;
			this.itemPathState += 1;

			item.sprite.gotoAndStop(item.start);
		},
		
		collides: function (objA, objB, radius) {
			
			function getDistance(p1, p2) {
				var dx = p1.x - p2.x,
					dy = p1.y - p2.y;
				return Math.sqrt(dx * dx + dy * dy);
			}

			if (getDistance(objA, objB) < radius) {
				return true;
			}
		},
		
		addParticle: function () {
			var frames = [
					{x: 0, y: 102, w: 28, h: 30},
					{x: 28, y: 102, w: 25, h: 30},
					{x: 55, y: 102, w: 35, h: 40},
					{x: 94, y: 102, w: 38, h: 40}
				],
				frame = frames[Math.floor(Math.random() * frames.length)];
			
			var sprite = new Sprite({img: AssetList.LIST[5].img, 
				frameX: frame.x, 
				frameY: frame.y, 
				w: frame.w, 
				h: frame.h
			});
				
			sprite.x = this.hero.x - 50;
			sprite.y = this.hero.y - 40 + Math.random() * 80;
			this.addChild(sprite);
			this.particles.push(sprite);
		},
		
		addEnemyGroup: function () {
			this.enemyGroup = new Enemies();
			this.enemyGroup.x = window.innerWidth + 300;
			this.enemyGroup.y = window.innerHeight / 2;
			this.addChild(this.enemyGroup);
		},
		
		generatePath: function () {
			this.path = [];
			
			var _x = window.innerWidth,
				_y;
			
			for (var i = 0; i < 1000; i += 1) {
				_x += 1000;
				_y = (window.innerHeight / 2) + Math.sin(i) * ((window.innerHeight / 2) - 200);
				
				var point = {x: _x, y: _y};
				this.path.push(point);
			}
		}
	});
	
	return Stage;
});