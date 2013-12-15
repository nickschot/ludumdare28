/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Action = new Class({
    initialize: function(entity, level) {
        this.entity = entity; //One who starts the action
        this.level = level;
    }
});

var ActionAttack = new Class({
    Extends: Action,
    initialize: function(x, y, entity, level) {
        this.parent(entity, level);
        this.isAttack = true;
        this.x = x; // Point of attack (abstract, may be different per attack)
        this.y = y; // Point of attack (abstract, may be different per attack)
    }
    
    
});

//x and y are the coördinates of the potential attack
var ActionAttackMelee = new Class({
    Extends: Attack,
    initialize: function(x, y, range, entity, level) {
        this.parent(x, y, entity, level);  //x,y is center of attack
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
    initialize: function(x, y, height, width, entity, level) {
        this.parent(x, y, entity, level);  //x,y is center of spawn place of attack
        this.isAttackRanged = true;
        this.height = height;       //height of attack entity
        this.width = width;         //width of attack entity
    },
    
    toTopLeftCorner: function() {
        return new Point(this.x - (this.width / 2), this.y - (this.height / 2));
    },
    
    toPlane: function() {
        var topLeft = this.toTopLeftCorner();
        return new Plane (topLeft, 
                          new Point(topLeft.x + this.width, topLeft.y), 
                          new Point(topLeft.x + this.width, topLeft.y + this.height), 
                          new Point(topLeft.x, topLeft.y + this.height));
    }
});

var ActionMove = new Class({
    Extends: Action,
    initialize: function(x, y, entity, level) {
        this.parent(entity, level);
        this.isMove = true;
        this.x = x;     //x of place to move to middle
        this.y = y;     //y of place to move to middle
    },  
    
    toTopLeftCorner: function() {
        return new Point(this.x - (this.width / 2), this.y - (this.height / 2));
    },
    
    toPlane: function() {
        var topLeft = this.toTopLeftCorner();
        return new Plane (topLeft, 
                          new Point(topLeft.x + this.width, topLeft.y), 
                          new Point(topLeft.x + this.width, topLeft.y + this.height), 
                          new Point(topLeft.x, topLeft.y + this.height));
    }
});

//x and y are the potential movement space
var ActionMoveHero = new Class({
    Extends: Move,
    initialize: function(x, y, entity, level) {
        this.parent(x, y, entity, level);
        this.isMoveHero = true;
    }  
});

var ActionMoveNPC = new Class({
    Extends: Move,
    initialize: function(x, y, entity, level) {
        this.parent(x, y, entity, level);
        this.isMoveNPC = true;
    }  
});