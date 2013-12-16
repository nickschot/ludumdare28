

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

    getRenderable: function() {

    },

    inObjectPlane: function(plane) {
        console.log('inObjectPlane (entity)');
        return this.parent.inObjectPlane(plane);
    },

    alive: function() {
        return true;
    }
});

var WizardEntity = new Class({
    Extends: Entity,

    initialize: function(id, x, y, height, width, isWalkable, level){
        this.parent(id, x,y,height,width,isWalkable, level);
        this.inputManager = new InputManager();

        var wizardAndCursor = this._createRenderable();

        this.group = new THREE.Object3D();
        this.group.add(wizardAndCursor.wizard);
        this.group.add(wizardAndCursor.cursor);

        this.group.x = x;
        this.group.y = y;

        this.cursor = wizardAndCursor.cursor;

        this.runMultiplier = 2.5;
        this.speed = 0.10;

        this.level = level;

        this.currentSpeed = 0.0;

        this.fireCooldown = 0;
        this.maxCooldown = 15;

        this.projectileSpeed = 0.5;
    },

    update: function(level) {
        var keyPressed = this.inputManager.getKeyPresses();

        var self = this;

        var dirX = 0;
        var dirY = 0;


        
        var run = false;

        var self = this;

        var pos = self.inputManager.getCursorPosition();
        var vector = new THREE.Vector2(pos.x - self.group.position.x, pos.y - self.group.position.y);

        vector.normalize();
        
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

                var distance = Math.sqrt(Math.pow((self.group.position.x + pos.x), 2) + Math.pow((self.group.position.x + pos.x), 2));

                self.level.addEntity(new Projectile("", self.group.position.x, self.group.position.y, 1.0, 1.0, true, self.level, vector.x * self.projectileSpeed, vector.y * self.projectileSpeed));
                self.fireCooldown = self.maxCooldown;
            }
        });

        
        if(dirX !== 0 || dirY !== 0) {
            var speedy = this.speed;
            if(dirX !== 0 && dirY !== 0){
                speedy = this.speed * Math.sin(0.25 * Math.PI);
            }

            if(run) speedy = speedy * this.runMultiplier;

            this.currentSpeed = (this.currentSpeed + speedy) / 2.0;

            var newX = this.group.position.x + (dirX * this.currentSpeed);
            var newY = this.group.position.y + (dirY * this.currentSpeed);

            var moveAction = new ActionMoveHero(newX, newY, this.height, this.width, this, this.level);
            var resultAction = whatHappensIf(moveAction);


            console.log(resultAction.isNothing);
            if(resultAction.isNothing) {
                this.group.position.x = newX;
                this.group.position.y = newY;

             }
        }
        

        var xrot = Math.acos(vector.x);

        this.cursor.rotation.z = (vector.y <= 0 ? Math.PI * 2 -  xrot : xrot) - 0.25 * Math.PI;


        if(this.fireCooldown > 0) this.fireCooldown--;
    },

    _createRenderable: function() {
        var wizardGeo = new THREE.PlaneGeometry(1,1);
        var wizardMaterial = entitySheet.getMaterial();

        var uv = tileSheet.getUvsFromIndex(this.getSpriteIndexX(), this.getSpriteIndexY());

        wizardGeo.faceVertexUvs = [[]];
        wizardGeo.faceVertexUvs[0].push([uv[1], uv[0], uv[2]]);
        wizardGeo.faceVertexUvs[0].push([uv[0].clone(), uv[3], uv[2].clone()]);

        var wizardMesh = new THREE.Mesh(wizardGeo, wizardMaterial);

        var cursorGeo = new THREE.PlaneGeometry(1,1);

        cursorGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0.5, 0.5, 0.0));

        var cursorTexture = new THREE.ImageUtils.loadTexture("img/game/ui/cursor_weapon.png");
        var cursorMat = new THREE.MeshBasicMaterial({map:cursorTexture, transparent:true});

        var cursorMesh = new THREE.Mesh(cursorGeo, cursorMat);

        return { wizard: wizardMesh, cursor: cursorMesh } ;
    },

    getRenderable: function() {
        return this.group;
    },

    alive: function() {
        return true;
    },
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
    },*/
    
    inObjectPlane: function(rect2) {
        var rect = this.toPlane();
        return rect.doesPlaneIntersect(rect2);
    },
    /*
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
        this.mesh.position.x = x;
        this.mesh.position.y = y;

        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        this.age = 0;
        this.maxAge = 20;
    },

    _createRenderable: function() {
        var geo = new THREE.PlaneGeometry(1,1); 

        var uv = entitySheet.getUvsFromIndex(0, 2);
        geo.faceVertexUvs = [[]];
        geo.faceVertexUvs[0].push([uv[1], uv[0], uv[2]]);
        geo.faceVertexUvs[0].push([uv[0].clone(), uv[3], uv[2].clone()]);
        
        var mesh = new THREE.Mesh(geo, entitySheet.getMaterial());

        return mesh;
    },

    getRenderable: function() {
        return this.mesh;
    },

    update: function() {
        if(this.age < this.maxAge) {
            this.mesh.position.x += this.xSpeed;
            this.mesh.position.y += this.ySpeed;
            this.age++;
        }

        
    },

    alive: function() {
        return this.age < this.maxAge;
    }
});

var SwordMan = new Class({
    Extends: Entity,
    initialize: function(id, x, y, height, width, isWalkable, level) {
        this.parent(x,y,height,width,isWalkable, level);

        this.renderable = this._createRenderable();

        this.renderable.position.x;
        this.renderable.position.y;

        this.level = level;

        this.speed = 0.125;

        this.direction = new THREE.Vector2(1.0, 1.0);

        this.direction.normalize();
    },

    alive: function() {
        return true;
    },

    update: function() {
        this.renderable.position.x += this.direction.x * this.speed;
        this.renderable.position.y += this.direction.y * this.speed;
    },

    _createRenderable: function() {
        var geo = new THREE.PlaneGeometry(1,1);

        var uv = entitySheet.getUvsFromIndex(0, 3);

        geo.faceVertexUvs = [[]];
        geo.faceVertexUvs[0].push([uv[1], uv[0], uv[2]]);
        geo.faceVertexUvs[0].push([uv[0].clone(), uv[3], uv[2].clone()]);

                
        var mesh = new THREE.Mesh(geo, entitySheet.getMaterial());

        return mesh;
    },

    getRenderable: function() {
        return this.renderable;
    }
});
    
    
