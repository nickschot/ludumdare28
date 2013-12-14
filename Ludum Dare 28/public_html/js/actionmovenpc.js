/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ActionMoveNPC = new Class({
    Extends: Move,
    initialize: function(x, y, chunk, toChunk) {
        this.parent(x, y, chunk, toChunk);
        this.isMoveNPC = true;
    }  
});