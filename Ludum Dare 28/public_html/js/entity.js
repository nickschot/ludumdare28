

var Entity = new Class({
    Extends: Obj,
    
    initialize: function(id, x, y, height, width, isWalkable, level){
        this.parent(x, y, height, width, isWalkable, level);
        this.id = id;
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
    },

    getRenderable: function() {}
});

var WizardEntity = new Class({
    Extends: Entity,

    initialize: function(id, x, y, height, width, isWalkable, level){
        this.parent(id, x,y,height,width,isWalkable, level);
        this.inputManager = new InputManager();
        this.renderable = this._createRenderable();

        this.x = x;
        this.y = y;

        this.runMultiplier = 2.5;
        this.speed = 0.10;

        this.level = level;

        this.currentSpeed = 0.0;

        this.fireCooldown = 0;
        this.maxCooldown = 30;
    },

    update: function(level) {
        var keyPressed = this.inputManager.getKeyPresses();

        var self = this;

        var dirX = 0;
        var dirY = 0;
        
        var run = false;

        var self = this;
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

            if(key === 'spacebar' && self.fireCooldown == 0) {
                console.log("spaaace");
                self.level.addEntity(new Projectile("", 0, 0, 1.0, 1.0, true, this.level, 0.05, 0.05));
                self.fireCooldown = self.maxCooldown;
            }
        });
        
        if(dirX !== 0 || dirY !== 0) {
            var speedy = this.speed;
            if(dirX != 0 && dirY != 0){
                speedy = this.speed * Math.sin(0.25 * Math.PI);
            }

            if(run) speedy = speedy * this.runMultiplier;

            this.currentSpeed = (this.currentSpeed + speedy) / 2.0;

            var newX = this.getX() + (dirX * this.currentSpeed);
            var newY = this.getY() + (dirY * this.currentSpeed);


            var moveAction = new ActionMoveHero(newX, newY, this.height, this.width, this, this.level);
            var resultAction = whatHappensIf(moveAction);

            if(resultAction.isNothing) {
                this.setX(newX);
                this.setY(newY);

                this.getRenderable().position.x = this.getX() / 32;
                this.getRenderable().position.y = this.getY() / 32;
            }
        }

        if(this.fireCooldown > 0) this.fireCooldown--;
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
    /*
    getId: function() {
        return this.parent.getId();
    },
    
    getX: function() {
        return this.parent.getX();
    },
    
    getY: function() {
        return this.parent.getY();
    },
    
    setX: function(x) {
        return this.parent.setX(x);
    },
    
    setY: function(y) {
        return this.parent.setY(y);
    },
    
    getLevel: function() {
        return this.parent.getLevel();
    },
    
    isWalkable: function() {
        return this.parent.isWalkable();
    },
    
    getHeight: function() {
        return this.parent.getHeight();
    },
    
    getWidth: function() {
        return this.parent.getWidth();
    },
    
    inObjectPlane: function(plane) {
        return this.parent.inObjectPlane(plane);
    },
    
    inObjectCircle: function(circle) {
        return this.parent.inObjectCircle(circle);
    },
    
    toTopLeftCorner: function() {
        return this.parent.toTopLeftCorner();
    },
    
    toPlane: function() {
        return this.parent.toPlane();
    }*/
});

var Projectile = new Class({
    Extends: Entity,

    initialize: function(id, x, y, height, width, isWalkable, level, xSpeed, ySpeed) {
        this.parent(x,y,height,width,isWalkable, level);

        this.mesh = this._createRenderable();

        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    },

    _createRenderable: function() {
        return new THREE.Mesh(new THREE.PlaneGeometry(1,1), entitySheet.getMaterial());
    },

    getRenderable: function() {
        return this.mesh;
    },

    update: function() {
        this.mesh.position.x += this.xSpeed;
        this.mesh.position.y += this.ySpeed;
    }
});
    
