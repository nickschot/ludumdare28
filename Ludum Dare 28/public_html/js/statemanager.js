var StateManager = new Class({
    initialize: function(main) {
        this.main = main;
        this.currentState = new InitState();
    },

    update: function() {
        this.currentState.update();
    },

    render: function() {
        this.currentState.update();
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
    },
    render: function() {

    },
    update: function() {
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
