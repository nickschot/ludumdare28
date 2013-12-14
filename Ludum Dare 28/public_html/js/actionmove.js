/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ActionMove = new Class({
    Extends: Action,
    initialize: function(x, y, chunk, toChunk) {
        this.parent(chunk);
        this.toChunk = toChunk;
        this.isMove = true;
        this.x = x;
        this.y = y;
        this.isMove = true;
    }  
});