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
        console.log("wizaaarad");
    },

    update: function() {


    }
});
