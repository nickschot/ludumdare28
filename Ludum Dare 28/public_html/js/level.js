/**
 * Singleton class that manages all chunks
 * @type Class
 */

var CHUNK_SIZE_X = 25;
var CHUNK_SIZE_Y = 19;

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
    
    _getTileType: function(color){
        var type;
        if(Array.contains(Object.keys(tileTypes), color) === true){
            type = tileTypes[color];
        }
        return type;
    }
});
