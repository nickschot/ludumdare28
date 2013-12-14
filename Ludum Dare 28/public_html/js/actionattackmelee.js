/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//x and y are the coördinates of the potential attack
var ActionAttackMelee = new Class({
    Extends: Attack,
    initialize: function(x, y, width, height, chunk) {
        this.parent(x, y, height, width, chunk);
        this.isAttackMelee = true;
    }  
});