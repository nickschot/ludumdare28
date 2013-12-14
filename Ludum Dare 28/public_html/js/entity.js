var Entity = new Class({
    initialize: function(type){
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
        
    },
    
    move: function(){
        
    }
});