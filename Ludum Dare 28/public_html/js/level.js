/**
 * Singleton class that manages all chunks
 * @type Class
 */
var tileWidth = 32;
var tileHeight = 32;

var Level = new Class({
    /**
     * @param chunks - An array containing all chunks
     */
    initialize: function(tiles_array){
        this.entities = new Array();
        this.tileTypeChunks = new Array();
        for(var y = 0; y < tiles_array.length; y++){
            this.tileTypeChunks[y] = new Array();
            for(var x = 0; x < tiles_array[y].length; x++){
                var tile = tiles_array[y][x];
                this.tileTypeChunks[y][x] = this._getTileType(tile);
            }
        }
    },

    addEntity: function(entity) {
        this.entities.push(entity);
    },

    getEntities: function() {
        return this.entities;
    },
    
    getLevelWidth: function(){
        return this.tileTypeChunks[0].length;
    },
    
    getLevelHeight: function(){
        return this.tileTypeChunks.length;
    },

    getLevel: function() {
        return this.tileTypeChunks;
    },

    update: function() {
        Array.each(this.entities, function(entity) { entity.update() } );
    },
    
    getObjectsOriginInCircle: function(circle) {
        var objects = this.getEntities() + this.tilesFromCircle(circle);
        var result = new Array();
        
        for(var i = 0; i < objects.length; i++) {
            if(circle.doesPointIntersect(new Point(objects[i].x, objects[i].y))) {
                result.push(objects[i]);
            }
        }
        
        return result;
    },
    
    tilesFromCircle: function(circle) {
        return tileFromRectange(new Plane(
                    new Point(circle.x - circle.radius, circle.y - circle.radius),
                    new Point(circle.x + circle.radius, circle.y - circle.radius),
                    new Point(circle.x + circle.radius, circle.y + circle.radius),
                    new Point(circle.x - circle.radius, circle.y + circle.radius)
                ));
    },
    
    tilesFromRectangle: function(rect) {
        var result = new Array();
        
        for(var y = Math.floor(rect.p1.y); y < rect.p3.y; y++) {
            for(var x = Math.floor(rect.p1.x); x < rect.p2.x; x++) {
                var tX = x + (tileWidth / 2);
                var tY = y + (tileHeight / 2);
                result.push(new Tile("tile" + tX + "," + tY, tX, tY, tileHeight, tileWidth, !isWall(x,y), this));
            }
            
        }
        
        return result;
    },
    
    isWall: function (x, y) {
       return this.getLevel[y][x].wall;
    },
    
    _getTileType: function(color){
        var type;
        if(Array.contains(Object.keys(tileTypes), color) === true){
            type = tileTypes[color];
        }
        return type;
    }
});
