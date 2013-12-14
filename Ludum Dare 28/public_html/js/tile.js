var Tile = new Class({
    initialize: function(type, x, y, orientation){
        this.x = x;
        this.y = y;
        this.size = 32;
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
            default:
                tileType = false;
                break;
        }
        return tileType;
    }
    
    
});