var SpriteSheet = new Class({
    initialize: function (location, xSprites, ySprites) {
        this.spriteSheet = new THREE.ImageUtils.loadTexture(location);

        this.xSprites = xSprites;
        this.ySprites = ySprites;

        this.material = new THREE.MeshBasicMaterial({ map:this.spriteSheet, side: THREE.DoubleSide, transparent: true, wireframe: false, blending: THREE.NormalBlending, opacity: 1.0});

    },

    // BOZE CODE, niet aanzitten
    getUvsFromIndex: function (x, y) {
        var uDelta = 1.0 / this.xSprites;
        var vDelta = 1.0 / this.ySprites;

        y = (this.ySprites - 1) - y;


        var uMin =  x    * uDelta + 0.002;
        var uMax = (x+1) * uDelta - 0.002;
        var vMin =  y    * vDelta + 0.002;
        var vMax = (y+1) * vDelta - 0.002;

        var faceuv = [
            new THREE.Vector2(uMin, vMin),
            new THREE.Vector2(uMin, vMax),
            new THREE.Vector2(uMax, vMax),
            new THREE.Vector2(uMax, vMin)
        ];

        return faceuv;
    },


    getTexture: function () {
        return this.spriteSheet;
    },

    getMaterial: function () {
        return this.material;
    }
});

var tileSheet = new SpriteSheet('img/game/spritesheet.png', 8, 8);
var entitySheet = new SpriteSheet('img/game/entitysheet.png', 8, 8);
