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
    initialize: function (stateManager, level_array) {
        this.stateManager = stateManager;

        this.count = 0;
        this.entitiesOnScene = new Array();

        this.level = new Level(level_array);            

        this.scene = new THREE.Scene();
        // TODO: doe hier eens niet 800 bij 600
        this.camera =  new THREE.PerspectiveCamera(45, 800 / 600, 1, 100);

        this.camera.position.set(0, 0, 22.5);
        //this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        this.addChunksToScene(this.level);

        this.player = new WizardEntity("wizard", 0, 0, 1.0, 1.0, false, this.level);

        this.scene.add(this.player.getRenderable());

        this.level.addEntity(this.player);

        this.level.addEntity(new SwordMan("wizard", 0, 0, 1.0, 1.0, false, this.level)); 

        this.entitiesOnScene.push(this.player);

    },

    addChunksToScene: function(level) {
        var plane = new THREE.PlaneGeometry(level.getLevelWidth(), level.getLevelHeight(), level.getLevelWidth(), level.getLevelHeight()); 

        var levelArray = level.getLevel();
        plane.faceVertexUvs = [[]];

        for(var y = 0; y < levelArray.length; y++){
            for(var x = 0; x < levelArray[y].length; x++){
                var tileType = levelArray[y][x];
                var uv = tileSheet.getUvsFromIndex(tileType.x, tileType.y);

                plane.faceVertexUvs[0].push([uv[1], uv[0], uv[2]]);

                plane.faceVertexUvs[0].push([uv[0].clone(), uv[3], uv[2].clone()]);                
            }
        }

        plane.applyMatrix(new THREE.Matrix4().makeTranslation(level.getLevelWidth() / 2.0, level.getLevelHeight() / 2.0, 0.0));
        var mesh = new THREE.Mesh(plane, tileSheet.getMaterial());

        this.scene.add(mesh);
    },
    // sometimes new entities spawn, add them to the scene
    _addEntitiesToScene: function() {
        var entities = this.level.getEntities();

        var self = this;
        
        Array.each(entities, function(entity) {
            if(!self.entitiesOnScene.contains(entity)){
                console.log("HOO wacht eens even, deze entity kende ik nog niet :O");
                var mesh = entity.getRenderable();

                console.log(mesh);
                self.scene.add(mesh);
                self.entitiesOnScene.push(entity);
            }
        });
    },

    _cleanupScene: function() {
        var toBeRemoved = new Array();
        var entities = this.level.getEntities();

        var self = this;

        Array.each(entities, function(entity) {
            if(!entity.alive() && self.entitiesOnScene.contains(entity)){
                self.entitiesOnScene.erase(entity);

                self.scene.remove(entity.getRenderable());

                console.log("deze entity stierf");

                toBeRemoved.push(entity);
            }
        });

        Array.each(toBeRemoved, function(entity) {
            entities.erase(entity);
        });            
    },

    render: function(renderer) {
        this.camera.position.set(this.player.getRenderable().position.x, this.player.getRenderable().position.y, 22.5);
        renderer.render(this.scene, this.camera);
    },
    update: function() {
        this.level.update();
        this._addEntitiesToScene();
        this._cleanupScene();
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
