/*global define*/
define([], 
	function (require) {
		
	var Backbone = require('backbone'),
		Vars;
		
	Vars = Backbone.Model.extend({
		initialize: function () {

        }
	});
	
	return new Vars();
});
