/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Level = new Class({
    initialize: function(chunks) {
        this.chunks = chunks; //:: [[Chunk]] list of rows
    },
    
    entityInChunks: function(entity) {
        var result = new Array();
        
        for(var i = 0; i < this.chunks.length; i++) {
            if(this.chunks[i].containsEntity(entity)) {
                result.push(this.chunks[i]);
            }
        }
        
        return result;
    },
    
    circleInChunks: function(circle) {
        var result = new Array();
        
        for(var i = 0; i < this.chunks.length; i++) {
            var rect = this.chunks[i].toPlane();
            if(circle.doesPlaneIntersect(rect)) {
                result.push(this.chunks[i]);
            }
        }
        
        return result;
    },
    
    planeInChunks: function(plane) {
        var result = new Array();
        
        for(var i = 0; i < this.chunks.length; i++) {
            var rect = this.chunks[i].toPlane();
            if(plane.doesPlaneIntersect(rect)) {
                result.push(this.chunks[i]);
            }
        }
        
        return result; 
    },
 
    whatIsAtPlane: function(plane) {
        var result = new Array();
        var chunks = this.planeInChunks(plane);
        
        for(var j = 0; j < chunks.length; j++) {
        
            for(var i = 0; i < chunks[j].entities.length; i++) {
                if(chunks[j].entities[i].inObjectPlane(plane)) {
                    result.push(chunks[j].entities[i]);
                }
            }
        }
        return result;
    },
    
    whatIsAtCircle: function(circle) {
        var result = new Array();
        var chunks = this.circleInChunks(circle);
        
        for(var j = 0; j < chunks.length; j++) {
        
            for(var i = 0; i < chunks[j].entities.length; i++) {
                if(chunks[j].entities[i].inObjectCircle(circle)) {
                    result.push(chunks[j].entities[i]);
                }
            }
        }
        return result;
    }
});
