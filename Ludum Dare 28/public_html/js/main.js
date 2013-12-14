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
        this.nextTime = 0;
        this.stateManager = undefined; //TODO: actually make a stateManager
        this.ticks = 30;

        //PIXI shizzle
        this.stage = new PIXI.Stage(0x66FF99);
        this.renderer = new PIXI.autoDetectRenderer(800, 600);

        //Stats
        this.updateStats = new Stats();
        this.frameStats = new Stats();

        update();        
        requestAnimationFrame(render);
        
        $$(document.body).adopt({this.updateStats.domElement, this.frameStats.domElement});
    },

    render: function() {
        this.frameStats.begin();
        this.stateManager.render();
        this.frameStats.end();
    },
    
    update: function() {
        this.updateStats.begin();
        // Burn some cycles till the next update is requested
        while((new Date).getTime() < next_time){}
        // first ask the time
        var time = (new Date).getTime();
        // then update 
        this.stateManager.update();    
        // then set next_time and call ourself with interval
        this.next_time = time + (1000 / this.ticks);
        // update our stats
        this.updateStats.end();
        // then callback ourself with some marge, in this case 10ms
        window.setTimeout(update, ((this.next_time - time) - 5));
    }
});
