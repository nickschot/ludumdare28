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
    
    containsEntity: function(entity) {
        return this.entities.some(function(item, index){
            return item.id === entity.id;
        });
    },
    //TODO
    getPointLeftTopPixels: function() {
        return new Point(4, 5);
    },
    //TODO
    getHeightPixels: function() {
        return 340;
    },
    //TODO
    getWidthPixels: function() {
        return 123;
    },
    
    toPlane: function() {
        var point = this.getPointLeftTopPixels();
        var height = this.getHeightPixels();
        var width = this.getWidthPixels();
        
        return new Plane (point, 
                          new Point(point.x + width, point.y), 
                          new Point(point.x + width, point.y + height), 
                          new Point(point.x, point.y + height));
    },

    getTiles: function() {
        return this.tiles;
    }
});
