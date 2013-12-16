
// x,y is the tile where the entity is in tile units. So 1,1 is 

var Obj = new Class({
    initialize: function(id, x, y, height, width, isWalkableV, level) {
        this.id = id;
        this.x = x; // middle
        this.y = y; // middle
        this.height = height;
        this.width = width;
        this.isWalkableV = isWalkableV;
        this.level = level;
    },
    
    getId: function() {
        return this.id;
    },
    
    getX: function() {
        return this.x;
    },
    
    setX: function(x) {
        this.x = x;
    },
    
    getY: function() {
        return this.y;
    },
    
    setY: function(y) {
        this.y = y;
    },
    
    getHeight: function() {
        return this.height;
    },
    
    getWidth: function() {
        return this.width;
    },
    
    isWalkable: function() {
        return this.isWalkableV;
    },
    
    inObjectPlane: function(rect2) {
        var rect = this.toPlane();
        return rect.doesPlaneIntersect(rect2);
    },
    
    inObjectCircle: function(circle) {
        var rect = this.toPlane();
        return circle.doesPlaneIntersect(rect);
    },
    
    toTopLeftCorner: function() {
        return new Point(this.x - (this.width / 2), this.y - (this.height / 2));
    },
    
    toPlane: function() {
        var topLeft = this.toTopLeftCorner();
        return new Plane (topLeft, 
                          new Point(topLeft.x + this.width, topLeft.y), 
                          new Point(topLeft.x + this.width, topLeft.y + this.height), 
                          new Point(topLeft.x, topLeft.y + this.height));
    }
});
