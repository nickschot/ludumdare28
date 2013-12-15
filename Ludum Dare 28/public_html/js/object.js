var Obj = new Class({
    initialize: function(x, y, height, width, isWalkable) {
        this.x = x; // topleft corner
        this.y = y; // topleft corner
        this.height = height;
        this.width = width;
        this.isWalkable = isWalkable;
    },
    
    inObjectPlane: function(rect2) {
        var rect = this.toPlane();
        return rect.planeInPlane(rect2);
    },
    
    inObjectCircle: function(circle) {
        var rect = this.toPlane();
        return rect.circleInPlane(circle);
    },
    
    toPlane: function() {
        return new Plane (new Point(this.x, this.y), 
                              new Point(this.x + this.width, this.y), 
                              new Point(this.x + this.width, this.y + this.height), 
                              new Point(this.x, this.y + this.height));
    }
});
