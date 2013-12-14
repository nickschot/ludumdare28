/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Chunk = new Class({
    initialize: function () {
        this.objects = new Array();
    },
    
    addObject: function (object) {
        this.objects = insertSorted(this.objects, object, "x");
    },
    
    removeObject: function (object) {
        var i = this.objects.indexOf(object);
        
        if(index > -1) {
            this.objects.splice(i, 1);
        }
    },
    
    whatIsAt: function(x, y) {
        var result = new Array();
        
        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i].inObject(x, y)) {
                result.push(this.objects[i]);
            }
        }
        
        return result;
    }
});