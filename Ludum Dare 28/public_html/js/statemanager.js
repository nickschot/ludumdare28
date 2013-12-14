var StateManager = new Class({
    initialize: function(renderer) {
        this.renderer = renderer;
        this.currentState = new InitState();
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

var InitState = new Class({
    Extends: State,
    initialize: function (stateManager) {
        this.parent(stateManager);

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

        var jsonRequest = new Request.JSON({url: 'level/overworld.json', 
            onSucces: function(level, text) {
                console.log("HOOOOOOI");
                self.switchTo(new GameState(self.stateManager, level));
            }, 
            onFailure: function(xhr) { 
                console.log(xhr);
            }
        }).get();
    },

    render: function(renderer) {
        renderer.render(this.scene, this.camera);
    },

    update: function() {
        this.mesh.rotation.z -= 0.3;
    }
});

var GameState = new Class({
    Extends: State,
    initialize: function (stateManager, level) {
        this.parent(stateManager);
        this.count = 0;
        this.chunksOnscene = {};

        var self = this;

//        var jsonRequest = new Request.JSON({url: 'level/overworld.json', onSucces: function(level) {
//            self.chunkManager = new ChunkManager(level);            
//
//            self.scene = new THREE.Scene();
//            // TODO: doe hier eens niet 800 bij 600
//            self.camera =  new THREE.PerspectiveCamera(45, 800 / 600, 1, 100);
//            self.camera.position.set(0, 0, -22.5);
//            self.camera.lookAt(self.scene.position);
//            self.scene.add(self.camera);
//
//            var chunks = chunkManager.renderChunk();
//
//         }}).get();
    },
    render: function(renderer) {
        renderer.render(this.scene, this.camera);
    },
    update: function() {
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
