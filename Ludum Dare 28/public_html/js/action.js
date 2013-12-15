/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Action = new Class({
    initialize: function(chunk) {
        this.chunk = chunk;
    }  
});

var ActionAttack = new Class({
    Extends: Action,
    initialize: function(x, y, range, chunk ) {
        this.parent(chunk);
        this.isAttack = true;
        this.x = x;
        this.y = y;
        this.range = range;
    },  
    
    inRange: function(rect) {
        return this.toCircle().doesPlaneIntersect(rect);
    },
    
    toCircle: function() {
        return new Circle(new Point(this.x, this.y), this.range);
    }
});

//x and y are the coördinates of the potential attack
var ActionAttackMelee = new Class({
    Extends: Attack,
    initialize: function(x, y, width, height, chunk) {
        this.parent(x, y, height, width, chunk);
        this.isAttackMelee = true;
    }  
});


//x and y are the potential spawning points of the ranged attack
var ActionAttackRanged = new Class({
    Extends: Attack,
    initialize: function(x, y, height, width, chunk) {
        this.parent(x, y, height, width, chunk);
        this.isAttackRanged = true;
    }
    

});

var ActionMove = new Class({
    Extends: Action,
    initialize: function(x, y, entity, chunk, toChunk) {
        this.parent(chunk);
        this.entity(entity);
        this.toChunk = toChunk;
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
    initialize: function(x, y, chunk, toChunk) {
        this.parent(x, y, chunk, toChunk);
        this.isMoveHero = true;
    }  
});

var ActionMoveNPC = new Class({
    Extends: Move,
    initialize: function(x, y, chunk, toChunk) {
        this.parent(x, y, chunk, toChunk);
        this.isMoveNPC = true;
    }  
});