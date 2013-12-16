var Tile = new Class({
    Extends: Obj,
    
    initialize: function(id, x, y, height, width, isWalkable, level){
        this.parent(id, x, y, height, width, isWalkable, level);
    },
});