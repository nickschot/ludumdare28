

var Entity = new Class({
    Extends: Obj,
    
    initialize: function(id, x, y, height, width, isWalkable, level){
        this.parent(id, x, y, height, width, isWalkable, level);
        this.id = id;
        console.log("entiteeh");
    },
    
    update: function(){
        //AI???
    },
    
    move: function(){
        
    },

    getSpriteIndexX: function() {
        return 0;
    },

    getSpriteIndexY: function() {
        return 0;
    }
});

var WizardEntity = new Class({
    Extends: Entity,

    initialize: function(id, x, y, height, width, isWalkable){
        this.parent(id, x,y,height,width,isWalkable);
        this.inputManager = new InputManager();
        this.renderable = this._createRenderable();

        this.x = x;
        this.y = y;

        this.runMultiplier = 2.5;
        this.speed = 2;
    },

    update: function(level) {
        var keyPressed = this.inputManager.getKeyPresses();

        var self = this;

        var dirX = 0;
        var dirY = 0;
        
        var run = false;
        Array.each(keyPressed, function(key) {
            if(key === 'w'){
                dirY += 1;
            }

            if(key === 's') {
                dirY -= 1;
            }

            if(key === 'a') {
                dirX -= 1;
            }

            if(key === 'd') {
                dirX += 1;
            }
        
            if(key === 'shift') {
                run = true;
            }
        });

        var speedy = this.speed;
        if(dirX !== 0 && dirY !== 0){
            speedy = this.speed * Math.sin(0.25 * Math.PI);
        }

        if(run) speedy = speedy * this.runMultiplier;

        this.x += (dirX * speedy);
        this.y += (dirY * speedy);

        this.renderable.position.x = this.x / 32;
        this.renderable.position.y = this.y / 32;
    },

    _createRenderable: function() {
        var plane = new THREE.PlaneGeometry(1,1);
        var material = entitySheet.getMaterial();

        var uv = tileSheet.getUvsFromIndex(this.getSpriteIndexX(), this.getSpriteIndexY());

        plane.faceVertexUvs = [[]];
        plane.faceVertexUvs[0].push([uv[1], uv[0], uv[2]]);
        plane.faceVertexUvs[0].push([uv[0].clone(), uv[3], uv[2].clone()]);

        return new THREE.Mesh(plane, material);
    },

    getRenderable: function() {
        return this.renderable;
    }
});
