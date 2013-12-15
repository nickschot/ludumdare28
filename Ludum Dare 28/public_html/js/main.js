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
        
        this.width = 800;
        this.height = 600;

        $('stats-wrapper').adopt(this.updateStats.domElement, this.frameStats.domElement);

        //Tree.js shizzle
        this.renderer = this._getRenderer();
        $('main-canvas-wrapper').adopt(this.renderer.domElement);
        
        this.renderer.setSize(this.width, this.height);

        this.stateManager = new StateManager(this.renderer);

        var self = this;
        requestAnimationFrame(function () {self.update(); self.render();});
    },

    _getRenderer: function() {
        return new THREE.WebGLRenderer({});
    },

    render: function() {
        this.frameStats.begin();
        this.stateManager.render();
        this.frameStats.end();


        var self = this;
        requestAnimationFrame(function () { self.render(); } );
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
