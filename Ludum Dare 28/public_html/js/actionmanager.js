var evaluationDistance = 20; //Distance
var hitboxEvaluationDistance = 2;


// Maps an action to a list of results
function whatHappensIf(action) {
    var result;
    
    if(action.isMove) {
        result = ifMove(action);
    } else if (action.isAttackRanged) {
        result = ifAttackRanged(action);
    } else if (action.isAttackMelee) {
        result = ifAttackMelee(action);
    } else {
        result = undefined;
    }
    
    return true;
}

function ifMove(moveAction) {
    return _whatWouldHitRect(moveAction);
}

function ifAttackRanged(attackActionRanged) {
    return _whatWouldHitRect(attackActionRanged);
}

function ifAttackMelee(attackActionMelee) {
    return _whatWouldHitCirc(attackActionMelee);
}

function _whatWouldHitRect(action) {
    var result;
    var evaluationCircle = new Circle(new Point(action.x, action.y), evaluationDistance);
    //First calculate which objects their origins lie within evaluationcircle
    var objectsInEC = action.level.getObjectsOriginInCircle(evaluationCircle);
    
    var hitboxEvaluationCircle = new Circle(new Point(action.x, action.y), hitboxEvaluationDistance);
    var objectsInHitBoxEC = new Array();
    
    //Second calculate which objects their hitboxes lie within hitboxEvaluationCircle
    for(var i = 0; i < objectsInEC.length; i++) {
        if(objectsInEC[i].inObjectCircle(hitboxEvaluationCircle)) {
            objectsInHitBoxEC.push(objectsInEC[i]);
        }
    }
    
    var bounces = new Array();
    //Third calculate which nearest objects their hitboxes lie within object hitbox
    for(var i = 0; i < objectsInHitBoxEC.length; i++) {
        if(action.entity.inObjectPlane(objectsInHitBoxEC[i].toPlane())) {
            bounces.push(objectsInHitBoxEC[i]);
        }
    }
    
    if(bounces.length === 0) {
        result = new ResultNothing();
    } else {
        result = new ResultBounce(bounces);
    }

    return result;
}

function _whatWouldHitCircle(action) {
    var result;
    var evaluationCircle = new Circle(new Point(action.x, action.y), evaluationDistance);
    //First calculate which objects their origins lie within evaluationcircle
    var objectsInEC = action.level.getObjectsOriginInCircle(evaluationCircle);
    
    var hitboxEvaluationCircle = new Circle(new Point(action.x, action.y), action.range);
    var bounces = new Array();
    
    //Second calculate which objects their hitboxes lie within hitboxEvaluationCircle
    for(var i = 0; i < objectsInEC.length; i++) {
        if(objectsInEC[i].isWalkable() && objectsInEC[i].inObjectCircle(hitboxEvaluationCircle)) {
            bounces.push(objectsInEC[i]);
        }
    }
    
    
    if(bounces.length === 0) {
        result = new ResultNothing();
    } else {
        result = new ResultBounce(bounces);
    }
    
    return result;
}

function _tilePointToRectangle(p) {
    return new Plane(
                new Point(p.x, p.y),
                new Point(p.x + tileWidth, p.y),
                new Point(p.x + tileWidth, p.y + tileHeight),
                new Point(p.x, p.y + tileHeight)
            );
}