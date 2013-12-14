var Entity = new Class({
    Extends: Object,
    
    initialize: function(x, y, height, width, isWalkable, type){
        this.parent(x, y, height, width, isWalkable);  
        this.type = type;
        this.entityType = createEntityType();
    },
    
    createEntityType: function(){
        var entity;
        switch(this.type){
            case 'wizard':
                entity = new WizardEntity();
                break;
            case 'dragon':
                entity = new DragonEntity();
                break;
            default:
                entity = null;
                break;
        }
        
        return entity;
    },
    
    update: function(){
        //AI???
    },
    
    move: function(){
        
    }
});
