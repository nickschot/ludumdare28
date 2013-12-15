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

        this.tileTypeChunks = new Array();
        for(var y = 0; y < this.chunks.length; y++){
            this.tileTypeChunks[y] = new Array();
            for(var x = 0; x < this.chunks[y].length; x++){
                this.tileTypeChunks[y][x] = new Array();
                for(var j = 0; j < this.chunks[y][x].length; j++){
                    this.tileTypeChunks[y][x][j] = new Array();
                    for(var i = 0; i < this.chunks[y][x][j].length; i++){
                        var tile = this.chunks[y][x][j][i];
                        this.tileTypeChunks[y][x][j][i] = this._getTileType(tile);
                    }
                }
            }
        }
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

    getChunk: function(x, y){
        var curr = this.chunks[y][x];
        var res = new Array();

        for(var j = 0; j < curr.length; j++){
            res[j] = new Array();
            for(var i = 0; i < curr[j].length; i++){
                res[j][i] = this._getTileType(curr[j][i]);
            }
        }
        return res;
    },

    getChunks: function() {
        return this.tileTypeChunks;
    },
    
    renderChunk: function(x,y){
        if(x < this.getLevelWidth() && y < this.getLevelHeight()){
            var tiles = new Array();
            for(var i = 0; i < this.getChunkHeight(); i++){
                tiles[i] = new Array();
                for(var j = 0; j < this.getChunkWidth(); j++){
                    var tile = this.chunks[y][x][i][j];
                    var tileType = this._getTileType(tile);
                    var geometry = this._createGeometry(tileType, CHUNK_SIZE_X * x + j, CHUNK_SIZE_Y * y + i);
                    tiles[i][j] = geometry;
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
            this.spriteSheetCache[tileType.spriteSheet] = new SpriteSheet(tileType.spriteSheet, 8, 8);
        }

        var geometry = this.spriteSheetCache[tileType.spriteSheet].getGeometryFromSpriteIndex(tileType.x, tileType.y, 1, 1);

        var matrix = new THREE.Matrix4();

        var material = this.spriteSheetCache[tileType.spriteSheet].getMaterial();

        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, 0.0);

//        mesh.matrix.setPosition(new THREE.Vector3(x, y, 0.0));
        return mesh;
    },
    
    _getTileType: function(color){
        var type;
        if(Array.contains(Object.keys(tileTypes), color) === true){
            type = tileTypes[color];
        }
        return type;
    }
});
