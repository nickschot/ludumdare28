/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Result = new Class({
    initialize: function() {
    }  
});

var ResultBounce = new Class({
    Extends: Result,
    initialize: function(objects) {
        this.parent();
        this.objects = objects;
    }  
});

var ResultNothing = new Class({
    Extends: Result,
    initialize: function() {
        this.parent();
    }  
});