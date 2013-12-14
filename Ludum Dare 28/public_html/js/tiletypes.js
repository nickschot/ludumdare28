var GrassTile = new Class({
    initialize: function(size){
        this.textureX = 0*size;
        this.textureY = 0*size;
        this.wall = false;
    }
});

var TreeTile = new Class({
    initialize: function(size){
        this.textureX = 0*size;
        this.textureY = 0*size;
        this.wall = false;
    }
});

var WallTile = new Class({
    initialize: function(size, orientation){
        switch(orientation){
            case 'right':
                this.textureX = 0;
                this.textureY = 0;
                break;
            case 'bottom':
                this.textureX = 0;
                this.textureY = 0;
                break;
            case 'left':
                this.textureX = 0;
                this.textureY = 0;
                break;
            default://default is TOP
                this.textureX = 0;
                this.textureY = 0;
                break;
        }
        this.textureX *= size;
        this.textureY *= size;
        this.wall = true;
    }
});