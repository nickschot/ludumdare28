window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//Initialize and build form based on backend info
var m;

window.addEvents({
	'load' : function() {
        
    },
	'domready': function() {
		//config
		Locale.use('en-US');

		//start
		m = new Main();
	}
});

var Main = new Class({
    initialize: function(){
        requestAnimationFrame(render);
        update();        
    },

    render: function() {

    },
    
    update: function() {

    }
});
