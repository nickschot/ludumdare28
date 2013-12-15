/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Circle = new Class({
   initialize: function(p, radius) {
       this.p = p;
       this.radius = radius;
   }, 
   
   doesPlaneIntersect: function(plane) {
       var vectors = plane.planeToVectors();
       var result = false;
       
       for(var i = 0; i < vectors.length; i++) {
           if(this.doesVectorIntersect(vectors[i])) {
               result = true;
           }
       }
       
       return result;
   },
   
   doesVectorIntersect: function(v) {
       var perpenv = v.perpendicularVector();
       perpenv.px = this.p.x;
       perpenv.py = this.p.y;
       
       intersectPoint = perpenv.vectorIntersectionPoint(v);
       return intersectPoint.lengthBetweenPoint(this.p) <= this.radius;
   },
   
   doesPointIntersect: function(p) {
       var distance = this.p.lengthBetweenPoint(p);
       
       return distance <= this.radius;
   }
});

var Plane = new Class({
   initialize: function(p1, p2, p3, p4) {
       this.p1 = p1; 
       this.p2 = p2; 
       this.p3 = p3; 
       this.p4 = p4; 
   },
   
   doesPointLieInPlane: function(p) {
       /* When a point p lies in a plane then:
        * Take a cornerpoint cp from the plane
        * Take the vector vp,cp between point p and cornerpoint cp 
        * The vector vp,cp will hit one of the vectors that are between the other cornerpoints
        * and the hitplace will be between the two cornerpoints that make up the vector
        */
       var v = this.p1.vectorBetweenPoint(p);
       
       var t23 = this.p2.vectorBetweenPoint(this.p3);
       var t34 = this.p3.vectorBetweenPoint(this.p4);
       var intersect23 = t23.vectorIntersectionPoint(v);
       var intersect34 = t34.vectorIntersectionPoint(v);
       
       return (t23.pointLiesOnVectorBetweenPoints(intersect23, this.p2, this.p3) || t34.pointLiesOnVectorBetweenPoints(intersect34, this.p3, this.p4));
   },
   
   
   doesPlaneIntersect: function (r2) {
        var result = false;

        if(this.p1.equals(r2.p1) && this.p2.equals(r2.p2) && this.p3.equals(r2.p3) && this.p4.equals(r2.p4)) {
            //plane1 is plane2
            result = true;
        } else if(this.doesPointLieInPlane(r2.p1) || this.doesPointLieInPlane(r2.p2) || this.doesPointLieInPlane(r2.p3) || this.doesPointLieInPlane(r2.p4)) {
            //1 or more points of plane2 are in plane1
            result = true;
        } else if(r2.doesPointLieInPlane(this.p1) || r2.doesPointLieInPlane(this.p2) || r2.doesPointLieInPlane(this.p3) || r2.doesPointLieInPlane(this.p4)) {
            //1 or more points of plane2 are in plane1
            result = true;
        }
        return result;
    },
    
    //Returns the vectors between the points of a plane in a list
    //Goes from point 1 to point 2 to point 3 to point 4 to point 1
    planeToVectors: function (r) {
        var result = new Array();
        result.push(vectorBetweenPoints(r.p1, r.p2));
        result.push(vectorBetweenPoints(r.p2, r.p3));
        result.push(vectorBetweenPoints(r.p3, r.p4));
        result.push(vectorBetweenPoints(r.p4, r.p1));
        return result;
    }
});

var Vector = new Class({
   initialize: function(dx, dy, px, py) {
       this.px = px;
       this.py = py;
       this.dx = dx;
       this.dy = dy;
   }, 
   
   //Calculates summation in direction from point v1
    //@requires v1.px == v2.px && v1.py == v2.py
    vectorPlus: function (v2) {
        return new Vector(this.dx + v2.dx, this.dy + v2.dy, this.px, this.py);
    },
   
    //Calculates difference in direction from point v1
    //@requires v1.px == v2.px && v1.py == v2.py
    vectorMin: function (v2) {
        return new Vector(this.dx - v2.dx, this.dy - v2.dy, this.px, this.py);
    },
   
    //Calculates the vector direction for which dot product == 0
    //Uses same step on point
    perpendicularVector: function () {
        var dx = -this.dy;
        var dy = this.dx;
     
       return new Vector(dx, dy, this.px, this.py);
    },
   
   isOppositeDirection: function(v) {
       var xc = v.dx / this.dx;
       var yc = v.dy / this.dy;
       
       return xc === yc && (oneNegOtherPos(v.dx, this.dx) || oneNegOtherPos(v.dy, this.dy));
   },
   
   /*
    * @require this.liesOnVector(p1) && this.liesOnVector(p2)
    */
   pointLiesOnVectorBetweenPoints: function (p, p1, p2) {
       var p1p = p1.vectorBetweenPoint(p);
       var pp2 = p.vectorBetweenPoint(p2);
       
       return p1p.isOppositeDirection(pp2);
   },
   
    //Returns false if vectors are parallel
    //Returns Point otherwise
    vectorIntersectionPoint: function vectorsIntersection(v2) {
        var result = false;

        var cy = (this.py - v2.py);
        var cx = (this.px - v2.px);

        var t1top    = v2.dy * cx - v2.dx * cy;
        var t1bottom = this.dx * v2.dx - v2.dy * this.dx;

        var t2top    = this.dx * cy - this.dy * cx;
        var t2bottom = v2.dy * this.dx - this.dy * v2.dx;

        if(t1bottom !== 0 && t2bottom !== 0) {
            var t1 = t1top / t1bottom;
            var t2 = t2top / t2bottom;
            result = new Point(this.dx * t1 + this.px, this.dy * t1 + this.dy);
        }

        return result;
    },
    
    doesVectorIntersect: function (v1, v2) {
        var intersectAt = v1.vectorIntersectionPoint(v2);
        var result = false;

        if(intersectAt === false && v1.px === v2.px && v1.py ===v2.py) {
            result = true;
        } else if(intersectAt) {
            result = true;
        }

        return result;
    }
});

var Point = new Class({
    initialize: function(x, y) {
        this.x = x;
        this.y = y;
    },
    
    equals: function(p2) {
        return this.x === p2.x && this.y === p2.y;
    },
    
    //Calculates difference between 2 points as a direction and uses p1 as starting point
    vectorBetweenPoint: function vectorBetweenPoint(p2) {
        return new Vector(p2.x - this.x, p2.y - this.y, this.x, p2.x);
    },
    
    lengthBetweenPoint: function(p2) {
        return Math.sqrt((p2.x - this.x)^2 + (p2.y - this.y)^2);
    }
});