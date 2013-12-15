var StateManager = new Class({
    initialize: function(renderer) {
        this.renderer = renderer;
        this.currentState = new InitState(this);
    },

    update: function() {
        this.currentState.update();
    },

    render: function() {
        this.currentState.render(this.renderer);
    },

    switchTo: function(state) {
        this.currentState = state;
    }
});

var State = new Class({
    initialize: function (stateManager) {
        this.stateManager = stateManager;
    },
    update:     function () {},
    render:     function () {},
    onSelected: function () {},
    onEnded:    function () {}
});

var GameState = new Class({
    Extends: State,
    initialize: function (stateManager, level) {
        this.stateManager = stateManager;
        console.log("heey gamestate");

        this.count = 0;
        this.chunksOnscene = {};

        console.log("LEVEL: " + level);
        this.chunkManager = new ChunkManager(level);            

        this.scene = new THREE.Scene();
        // TODO: doe hier eens niet 800 bij 600
        this.camera =  new THREE.PerspectiveCamera(45, 800 / 600, 1, 100);
        this.camera.position.set(0, 0, -22.5);
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        var chunks = self.chunkManager.renderChunk();

        var self = this;

        Array.each(chunks, function(chunk) {
            var tiles = chunk.getTiles()
            for(var i = 0; i < tiles.length; i++){
                for(var j = 0; j < tiles[i].length; j++) {
                    self.scene.add(tiles[i][j]);
                }
            }

        });

    },
    render: function(renderer) {
        renderer.render(this.scene, this.camera);
    },
    update: function() {
    }
});

var InitState = new Class({
    Extends: State,
    initialize: function (stateManager) {
        this.stateManager = stateManager;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 100);

        this.camera.position.set(0, 0, 12.75);

        this.camera.lookAt(this.scene.position);

        this.scene.add(this.camera);

        this.sprite = new THREE.ImageUtils.loadTexture('img/game/ui/loading.png');

        this.material = new THREE.MeshBasicMaterial({ map:this.sprite, side: THREE.DoubleSide, transparent: true});
        
        this.planeGeo = new THREE.PlaneGeometry(1, 1);

        this.mesh = new THREE.Mesh(this.planeGeo, this.material);

        this.scene.add(this.mesh);

        var self = this;
        
        console.log("heey initstate");
//        var jsonRequest = new Request.JSON({url: 'level/overworld.json', 
//            onSuccess: function(level) {
//                console.log("Hoi" + level);
//                self.stateManager.switchTo(new GameState(self.stateManager, level));
//            },
//            onFailure: function(xhr) {
//                console.log('Could not load overworld.json');
//                console.log(xhr);
//            }
//        }).get();
    },

    render: function(renderer) {
        renderer.render(this.scene, this.camera);
    },

    update: function() {
        this.mesh.rotation.z -= 0.3;
    }
});

var PauzeState = new Class({
    Implements: GameState,
    render: function () {
        this.parent.render();
    },
    update: function() {
    }
});
