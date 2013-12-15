
// x,y is the tile where the entity is in tile units. So 1,1 is 

var Obj = new Class({
    initialize: function(id, x, y, height, width, isWalkable, level) {
        this.id = id;
        this.x = x; // middle
        this.y = y; // middle
        this.height = height;
        this.width = width;
        this.isWalkable = isWalkable;
        this.level = level;
    },
    
    inObjectPlane: function(rect2) {
        var rect = this.toPlane();
        return rect.planeInPlane(rect2);
    },
    
    inObjectCircle: function(circle) {
        var rect = this.toPlane();
        return rect.circleInPlane(circle);
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
