var FOEI = true;

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

        this.count = 0;
        this.chunksOnscene = {};

        this.chunkManager = new ChunkManager(level);            

        this.scene = new THREE.Scene();
        // TODO: doe hier eens niet 800 bij 600
        this.camera =  new THREE.PerspectiveCamera(45, 800 / 600, 1, 100);

        this.camera.position.set(10, -10, 22.5);
        //this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        this.addChunksToScene(this.chunkManager.getChunks());
    },

    addChunksToScene: function(chunks) {
        for(var y = 0; y < chunks.length; y++){
            for(var x = 0; x < chunks[y].length; x++){
                var plane = new THREE.PlaneGeometry(25, 19, 25, 19);
                plane.faceVertexUvs = [[]];

                for(var j = 0; j < chunks[y][x].length; j++){
                    for(var i = 0; i < chunks[y][x][j].length; i++){
                        var tileType = chunks[y][x][j][i];

                        var uv = tileSheet.getUvsFromIndex(tileType.x, tileType.y);

                        plane.faceVertexUvs[0].push([uv[1], uv[0], uv[2]]);

                        plane.faceVertexUvs[0].push([uv[0].clone(), uv[3], uv[2].clone()]);
                    }
                }

                var mesh = new THREE.Mesh(plane, tileSheet.getMaterial());
                mesh.position.x = x * 25;
                mesh.position.y = -1 * y * 19;

                console.log(mesh);

                this.scene.add(mesh);
            }
        }
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

        this.camera.position.set(0, 0, 22.5);

        this.camera.lookAt(this.scene.position);

        this.scene.add(this.camera);

        this.sprite = new THREE.ImageUtils.loadTexture('img/game/ui/loading.png');

        this.material = new THREE.MeshBasicMaterial({ map:this.sprite, side: THREE.DoubleSide, transparent: true});
        
        this.planeGeo = new THREE.PlaneGeometry(1, 1);

        this.mesh = new THREE.Mesh(this.planeGeo, this.material);

        this.scene.add(this.mesh);

        var self = this;

        var jsonRequest = new Request.JSON({url: 'level/overworld.json', 
            onSuccess: function(level) {
                self.stateManager.switchTo(new GameState(self.stateManager, level));
            },
            onFailure: function(xhr) {
                console.log('Could not load overworld.json');
                if (FOEI) {
                    self.stateManager.switchTo(new GameState(self.stateManager, JSON.parse(xhr.response)));
                }
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
