/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Object = new Class({
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