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
    
    inObject: function(x, y) {
        return (x > this.x && x < (this.x + this.width) && y > this.y && (this.y + this.height));
    }
});