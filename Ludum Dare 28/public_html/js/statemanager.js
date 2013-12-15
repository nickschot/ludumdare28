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
        this.camera.position.set(0, 0, 10.5);
        //this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        var chunk = this.chunkManager.getChunk(0,0);

        this.plane = new THREE.PlaneGeometry(25, 19, 25, 19);

        console.log(this.plane.faces);

        console.log(this.plane.faceVertexUvs);

        this.plane.faceVertexUvs = [[]]

        for(var y  = 0; y < chunk.length; y++){
            for(var x = 0; x < chunk[y].length; x++){
                var facesIndex1 = (y * chunk.length + x) * 2;
                var facesIndex2 = facesIndex1 + 1;

                var tileType = chunk[y][x];

                uv = tileSheet.getUvsFromIndex(tileType.x, tileType.y);

                this.plane.faceVertexUvs[0].push([ uv[1], uv[0], uv[2] ] );

                this.plane.faceVertexUvs[0].push([uv[0].clone(), uv[3], uv[2].clone()]);
                
            }
        }

        console.log(this.plane.faceVertexUvs);

        this.material = new THREE.MeshBasicMaterial({ map:this.spriteSheet, side: THREE.DoubleSide, transparent: true});

        this.mesh = new THREE.Mesh(this.plane, tileSheet.getMaterial());

        this.scene.add(this.mesh);
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
