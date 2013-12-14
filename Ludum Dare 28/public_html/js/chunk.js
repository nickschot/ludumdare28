var Chunk = new Class({
    initialize: function (tiles) {
        this.tiles = tiles;
        this.entities = new Array();
    },
    
    addEntity: function (object) {
        this.entities = insertSorted(this.objects, object, "x");
    },
    
    removeEntity: function (object) {
        var i = this.entities.indexOf(object);
        
        if(index > -1) {
            this.entities.splice(i, 1);
        }
    },
    
    whatIsAt: function(x, y) {
        var result = new Array();
        
        for(var i = 0; i < this.entities.length; i++) {
            if(this.entities[i].inObject(x, y)) {
                result.push(this.entities[i]);
            }
        }
        
        return result;
    }
});