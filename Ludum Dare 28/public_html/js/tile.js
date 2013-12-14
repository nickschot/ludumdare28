var tileSize = 32;

var Tile = new Class({
    Extends: Object,
    initialize: function(type, x, y, orientation){
        this.parent(x, y, tileSize, tileSize, true);
        this.tile = this.getTileType(type);
        this.orientation = orientation !== undefined ? orientation : 'top';
    },
    
    getTileType: function(type){
        var tileType;
        switch(type){
            case 'grass':
                tileType = new GrassTile(this.size);
                break;
            case 'tree':
                tileType = new TreeTile(this.size);
            case 'wall':
                tileType = new WallTile(this.size, this.orientation);
                this.isWalkable = false;
            default:
                tileType = false;
                break;
        }
        return tileType;
    }
    
    
});