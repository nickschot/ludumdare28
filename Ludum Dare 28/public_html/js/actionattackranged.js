/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//x and y are the potential spawning points of the ranged attack
var ActionAttackRanged = new Class({
    Extends: Attack,
    initialize: function(x, y, height, width, chunk) {
        this.parent(x, y, height, width, chunk);
        this.isAttackRanged = true;
    }  
});