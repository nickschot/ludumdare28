/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Action = new Class({
    initialize: function(entity, level) {
        this.entity = entity; //One who starts the action
        this.level = level;
    },
    
    getLevel: function() {
        return this.level;
    }, 
    
    getEntity: function() {
        return this.entity;
    }
});

var ActionAttack = new Class({
    Extends: Action,
    initialize: function(x, y, entity, level) {
        this.parent(entity, level);
        this.x = x; // Point of attack (abstract, may be different per attack)
        this.y = y; // Point of attack (abstract, may be different per attack)
    },
    /*
    getLevel: function() {
        return this.parent.level;
    }, 
    
    getEntity: function() {
        return this.parent.entity;
    },
    */
    getX: function() {
        return this.x;
    },
    
    getY: function() {
        return this.y;
    },
    
    isAttack: function() {
        return true;
    }
});

//x and y are the coördinates of the potential attack
var ActionAttackMelee = new Class({
    Extends: ActionAttack,
    initialize: function(x, y, range, entity, level) {
        this.parent(x, y, entity, level);  //x,y is center of attack
        this.isAttackMelee = true;
        this.range = range;
    },
    /*
    getLevel: function() {
        return this.parent.getLevel();
    }, 
    
    getEntity: function() {
        return this.parent.getEntity();
    },
    
    getX: function() {
        return this.parent.getX();
    },
    
    getY: function() {
        return this.parent.getY();
    },
    */
    getRange: function() {
        return this.range;
    },
    /*
    isAttack: function() {
        return this.parent.isAttack();
    },
    */
    isAttackMelee: function() {
        return this.true;
    },
    
    toCircle: function() {
        return new Circle(new Point(this.x, this.y), this.range);
    }
});


//x and y are the potential spawning points of the ranged attack
var ActionAttackRanged = new Class({
    Extends: ActionAttack,
    initialize: function(x, y, height, width, entity, level) {
        this.parent(x, y, entity, level);  //x,y is center of spawn place of attack
        this.height = height;       //height of attack entity
        this.width = width;         //width of attack entity
    },
    /*
    getX: function() {
        return this.parent.getX();
    },
    
    getY: function() {
        return this.parent.getY();
    },
    
    getEntity: function() {
        return this.parent.getEntity();
    },
        
    getLevel: function() {
        return this.parent.getLevel();
    },
    */
    getHeight: function() {
        return this.height;
    },
    
    getWidth: function() {
        return this.width;
    },
    

    isAttackRanged: function() {
        return true;
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

//x,y are the potential place to move to in the middle
var ActionMove = new Class({
    Extends: Action,
    initialize: function(x, y, height, width, entity, level) {
        this.parent(entity, level);
        this.x = x;
        this.y = -y;
        this.height = height;
        this.width = width;
    },  
    
    getX: function() {
        return this.x;
    },
    
    getY: function() {
        return this.y;
    },
    
    getHeight: function() {
        return this.height;
    },
    
    getWidth: function() {
        return this.width;
    },
    
    isMove: function() {
        return true;
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
    Extends: ActionMove,
    initialize: function(x, y, height, width, entity, level) {
        this.parent(x, y, height, width, entity, level);
    },

    isActionMoveHero: function() {
        return true;
    }
});

var ActionMoveNPC = new Class({
    Extends: ActionMove,
    initialize: function(x, y, height, width, entity, level) {
        this.parent(x, y, height, width, entity, level);
    },
  
    isActionMoveNPC: function() {
        return true;
    }
});