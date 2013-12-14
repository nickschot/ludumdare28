/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//x and y are the potential movement space
var ActionMoveHero = new Class({
    Extends: Move,
    initialize: function(x, y, chunk, toChunk) {
        this.parent(x, y, chunk, toChunk);
        this.isMoveHero = true;
    }  
});