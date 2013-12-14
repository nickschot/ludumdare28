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
        this.count = 0;

        this.scene = new THREE.Scene();
        // TODO: doe hier eens niet 800 bij 600
        this.camera =  new THREE.PerspectiveCamera(45, 800 / 600, 1, 100);
        this.camera.position.set(0, 0, -22.5);
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        this.spriteSheet = new SpriteSheet("img/game/spritesheet.png", 8, 8);

        console.log(THREE.FrontSide);

        this.planeMaterial = new THREE.MeshBasicMaterial({ map:this.spriteSheet.getTexture(), side: THREE.DoubleSide, transparent: true});

        this.planeGeo = this.spriteSheet.getGeometryFromSpriteIndex(7, 7, 1, 1);

        this.plane = new THREE.Mesh(this.planeGeo, this.planeMaterial);

        this.scene.add(this.plane);
    },
    render: function(renderer) {
        renderer.render(this.scene, this.camera);
    },
    update: function() {
    }
});

var GameState = new Class({
    Implements: State,
    render: function() {
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
