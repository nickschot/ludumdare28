var Entity = new Class({
    Extends: Obj,
    
    initialize: function(id, x, y, height, width, isWalkable){
        this.parent(x, y, height, width, isWalkable);
        this.id = id;
        console.log("entiteeh");
    },
    
    update: function(){
        //AI???
    },
    
    move: function(){
        
    },
});

var WizardEntity = new Class({
    Extends: Entity,

    initialize: function(id, x, y, height, width, isWalkable){
        this.parent(x,y,height,width,isWalkable);
        this.inputManager = new InputManager();

        this.x = x;
        this.y = y;

        this.xSpeed = 5;
        this.ySpeed = 5;
    },

    update: function() {
        var keyPressed = this.inputManager.getKeyPresses();

        if(Array.contains(keyPressed, 'up arrow')){
            this.y += this.ySpeed;
        }

        if(Array.contains(keyPressed, 'down arrow')) {
            this.y -= this.ySpeed;
        }

        if(Array.contains(keyPressed, 'left arrow')) {
            this.x -= this.xSpeed;
        }

        if(Array.contains(keyPressed, 'right arrow')) {
            this.x += this.xSpeed;
        }
    }
});
