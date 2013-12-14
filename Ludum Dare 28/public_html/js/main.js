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
        this.nextTime = (new Date).getTime();
        this.ticks = 30;

        //Stats
        this.updateStats = new Stats();
        this.updateStats.setMode(0);
        this.frameStats = new Stats();
        this.frameStats.setMode(0);
        $('stats').adopt(this.updateStats.domElement, this.frameStats.domElement);

        //PIXI shizzle
        this.renderer = new PIXI.autoDetectRenderer(800, 600);
        $('main-canvas-wrapper').adopt(this.renderer.view);

        this.stateManager = new StateManager(this.renderer);

        this.update();
        var self = this;
        requestAnimationFrame(function () {self.render();});
    },

    render: function() {
        this.frameStats.begin();
        this.stateManager.render();
        this.frameStats.end();
    },
    
    update: function() {
        this.updateStats.begin();
        // Burn some cycles till the next update is requested
        while((new Date).getTime() < this.nextTime){
            
        }
        
        // first ask the time
        var time = (new Date).getTime();
        // then update 
        this.stateManager.update();
        
        // then set next_time and call ourself with interval
        this.nextTime = time + Math.floor(1000 / this.ticks);
        // update our stats
        this.updateStats.end();
        // then callback ourself with some marge, in this case 10ms
        var self = this;

        window.setTimeout(function() { self.update(); }, (Math.floor(1000 / this.ticks) - 5));
    }
});
