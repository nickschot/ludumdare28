/**
 * Singleton class that manages all chunks
 * @type Class
 */
var ChunkManager = new Class({
    /**
     * @param chunks - An array containing all chunks
     */
    initialize: function(chunks){
        this.chunks = chunks;
    },
    
    getLevelWidth: function(){
        return this.chunks[0].length;
    },
    
    getLevelHeight: function(){
        return this.chunks.length;
    },
    
    getChunkWidth: function(){
        return this.chunks[0][0][0].length;
    },
    
    getChunkHeight: function(){
        return this.chunks[0][0].length;
    },
    
    renderChunk: function(x,y){
        if(x < this.getLevelWidth() && y < this.GetLevelHeight()){
            var tiles = new Array();
            for(var i = 0; i < this.getChunkHeight(); i++){
                for(var j = 0; j < this.getChunkWidth(); j++){
                    tiles[i][j] = _createGeometry(this._getTileType(this.chunks[y][x]));
                }
            }
            return new Chunk(tiles);
        } else {
            return false;
        }
    },
    
    _createGeometry: function(tileType){
        
    },
    
    _getTileType: function(color){
        var type;
        if(Object.contains(tileTypes, color) === true){
            type = tileTypes[color];
        }
        return type;
    }
});