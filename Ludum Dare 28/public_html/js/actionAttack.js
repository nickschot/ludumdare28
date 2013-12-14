/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ActionAttack = new Class({
    Extends: Action,
    initialize: function(x, y, height, width, chunk ) {
        this.parent(chunk);
        this.isAttack = true;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    },  
    
    inRange: function(x, y) {
        return (x > this.x && x < (this.x + width) && y > this.y && y < (this.y + height));
    }
});