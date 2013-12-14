/**
 * Singleton class that manages all chunks
 * @type Class
 */

var CHUNK_SIZE_X = 25;
var CHUNK_SIZE_Y = 19;

var ChunkManager = new Class({
    /**
     * @param chunks - An array containing all chunks
     */
    initialize: function(chunks){
        this.chunks = chunks;
        this.spriteSheetCache = {}
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
                    tiles[i][j] = _createGeometry(this._getTileType(this.chunks[y][x]), CHUNK_SIZE_X * x + j, CHUNK_SIZE_Y * y + i);
                }
            }
            return new Chunk(tiles);
        } else {
            return false;
        }
    },
    
    _createGeometry: function(tileType, x, y){
        if(!Object.contains(this.spriteSheetCache, tileType.spriteSheet)){
            // 8 bij 8 is nu hardcoded, dat hoort niet :(
            this.spriteSheetCache[tile.spriteSheet] = new SpriteSheet(tile.spriteSheet, 8, 8);
        }

        var geometry = this.spriteSheetCache[tile.spriteSheet].getGeometryFromSpriteIndex(tile.x, tile.y);
        var material = this.spriteSheetCache[tile.spriteSheet].getMaterial();

        var mesh = new THREE.Mesh(geometry, material);

        mesh.matrix.setPositon(new THREE.Vector3(x, y, 0.0));

        return mesh;
    },
    
    _getTileType: function(color){
        var type;
        if(Object.contains(tileTypes, color) === true){
            type = tileTypes[color];
        }
        return type;
    }
});
