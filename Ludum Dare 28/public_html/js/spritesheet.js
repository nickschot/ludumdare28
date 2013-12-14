var SpriteSheet = new Class({
    initialize: function (location, xSprites, ySprites) {
        this.spriteSheet = new THREE.ImageUtils.loadTexture(location);

        this.xSprites = xSprites;
        this.ySprites = ySprites;
    },

    // BOZE CODE, niet aanzitten
    getGeometryFromSpriteIndex: function (x, y, xSize, ySize) {
        var uDelta = 1.0 / this.xSprites;
        var vDelta = 1.0 / this.ySprites;

        y = (this.ySprites - 1) - y;


        var uMin =  x    * uDelta;
        var uMax = (x+1) * uDelta;
        var vMin =  y    * vDelta;
        var vMax = (y+1) * vDelta;

        var faceuv = [
            new THREE.Vector2(uMin, vMin),
            new THREE.Vector2(uMin, vMax),
            new THREE.Vector2(uMax, vMin),
            new THREE.Vector2(uMax, vMax),
        ];

        var planeGeo = new THREE.PlaneGeometry(xSize, ySize);

        planeGeo.faceVertexUvs = [[]];
        planeGeo.faceVertexUvs[0].push([faceuv[0], faceuv[2], faceuv[1]]);
        planeGeo.faceVertexUvs[0].push([faceuv[2].clone(), faceuv[3], faceuv[1].clone()]);

        return planeGeo;
    },


    getTexture: function () {
        return this.spriteSheet;
    }
});
