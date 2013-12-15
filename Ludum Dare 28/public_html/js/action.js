/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Action = new Class({
    initialize: function(entity) {
        this.entity = entity; //One who starts the action
    }  
});

var ActionAttack = new Class({
    Extends: Action,
    initialize: function(x, y, entity) {
        this.parent(entity);
        this.isAttack = true;
        this.x = x;
        this.y = y;
    }
});

//x and y are the coördinates of the potential attack
var ActionAttackMelee = new Class({
    Extends: Attack,
    initialize: function(x, y, range, entity) {
        this.parent(x, y, entity);
        this.isAttackMelee = true;
        this.range = range;
    }, 
    
    toCircle: function() {
        return new Circle(new Point(this.x, this.y), this.range);
    }
});


//x and y are the potential spawning points of the ranged attack
var ActionAttackRanged = new Class({
    Extends: Attack,
    initialize: function(x, y, height, width, entity) {
        this.parent(x, y, entity);
        this.isAttackRanged = true;
        this.height = height;
        this.width = width;
    },
    
    toPlane: function() {
        return new Plane (new Point(this.x, this.y), 
                          new Point(this.x + this.entity.width, this.y), 
                          new Point(this.x + this.entity.width, this.y + this.entity.height), 
                          new Point(this.x, this.y + this.entity.height));
    }
});

var ActionMove = new Class({
    Extends: Action,
    initialize: function(x, y, entity) {
        this.parent(entity);
        this.isMove = true;
        this.x = x;
        this.y = y;
    },  
    
    toPlane: function() {
        return new Plane (new Point(this.x, this.y), 
                          new Point(this.x + this.entity.width, this.y), 
                          new Point(this.x + this.entity.width, this.y + this.entity.height), 
                          new Point(this.x, this.y + this.entity.height));
    }
});

//x and y are the potential movement space
var ActionMoveHero = new Class({
    Extends: Move,
    initialize: function(x, y, entity) {
        this.parent(x, y, entity);
        this.isMoveHero = true;
    }  
});

var ActionMoveNPC = new Class({
    Extends: Move,
    initialize: function(x, y, entity) {
        this.parent(x, y, entity);
        this.isMoveNPC = true;
    }  
});