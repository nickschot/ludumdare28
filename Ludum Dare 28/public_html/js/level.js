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
        Array.each(this.entities, function(entity) {entity.update(); } );
    },
    
    getObjectsOriginInCircle: function(circle) {
        var objects = new Array();
        objects.append(this.getEntities()).append(this.tilesFromCircle(circle));
        var result = new Array();
        
        for(var i = 0; i < objects.length; i++) {
            if(circle.doesPointIntersect(new Point(objects[i].x, objects[i].y))) {
                result.push(objects[i]);
            }
        }
        
        return result;
    },
    
    tilesFromCircle: function(circle) {
        var rectA = new Plane(
                    new Point(circle.p.x - circle.radius, circle.p.y - circle.radius),
                    new Point(circle.p.x + circle.radius, circle.p.y - circle.radius),
                    new Point(circle.p.x + circle.radius, circle.p.y + circle.radius),
                    new Point(circle.p.x - circle.radius, circle.p.y + circle.radius)
                );
                
        return this.tilesFromRectangle(rectA);
    },
    
    tilesFromRectangle: function(rect) {
        var result = new Array();
        
        var x = Math.max(0, Math.floor(rect.p1.x));
        var y = Math.max(0, Math.floor(rect.p1.y));
        var xMax = Math.min(this.getLevelWidth(), Math.floor(rect.p3.x));
        var yMax = Math.min(this.getLevelHeight(), Math.floor(rect.p3.y));
        

        for(y; y < yMax; y++) {
            for(x; x < xMax; x++) {
                var tX = x + (tileWidth / 2);
                var tY = y + (tileHeight / 2);
                
               // console.log("x: " + x + " y: " + y);
                result.push(new Tile("tile" + tX + "," + tY, tX, tY, tileHeight, tileWidth, !this.isWall(x,y), this));

                if(result.length > 0) console.log("Ik heb tiles gevonden");
            }
            
        }
                //console.log(result);
        return result;
    },
    
    isWall: function (x, y) {
       return (this.getLevel())[y][x].wall;
    },
    
    _getTileType: function(color){
        var type;
        if(Array.contains(Object.keys(tileTypes), color) === true){
            type = tileTypes[color];
        }
        return type;
    }
});
