/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ActionAttack = new Class({
    Extends: Action,
    initialize: function(chunk) {
        this.parent(chunk);
        this.isAttack = true;
    }  
});