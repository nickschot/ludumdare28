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

        this.ballTexture = new PIXI.Texture.fromImage("img/game/rondje.png");
        this.stage = new PIXI.Stage(0xFFFFFF);
        this.circle = new PIXI.Sprite(this.ballTexture);
        console.log(this.circle);
        this.stage.addChild(this.circle);
    },
    render: function(renderer) {
        renderer.render(this.stage);
    },
    update: function() {
        this.circle.x = 12;
        this.count++;
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
