/*global require*/
require.config({
    shim: {
    },

    paths: {
	    tweenmax: 'vendor/greensock/TweenMax',
        jquery: 'vendor/jquery/jquery',
        underscore: 'vendor/underscore-amd/underscore',
	    backbone: 'vendor/backbone-amd/backbone',
        raf: 'vendor/RequestAnimationFrame',
		fastcanvas: 'vendor/FastCanvas',
		cordova: 'vendor/cordova-2.3.0',
		stats: 'vendor/Stats'
    }
});

require(['app']);
