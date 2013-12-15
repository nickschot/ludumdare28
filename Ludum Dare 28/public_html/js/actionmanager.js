/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
    var result;
    
    var bounces = _calculateBounces(moveAction.toChunk.whatIsAtPlane(moveAction.toPlane(), moveAction.entity));
    
    if(bounces.length === 0) {
        result = new ResultNothing();
    } else {
        result = new ResultBounce(bounces);
    }

    return result;
}

function ifAttackRanged(attackActionRanged) {
    var result;
    
    var bounces = _calculateBounces(attackAction.toChunk.whatIsAtPlane(attackActionRanged.toPlane()));
    
    if(bounces.length === 0) {
        result = new ResultNothing();
    } else {
        result = new ResultBounce(bounces);
    }
    
    return result;
}

function ifAttackMelee(attackActionMelee) {
    var result;
    
    var bounces = _calculateBounces(attackAction.toChunk.whatIsAtCircle(attackActionMelee.toCircle()));
    
    if(bounces.length === 0) {
        result = new ResultNothing();
    } else {
        result = new ResultBounce(bounces);
    }
    
    return result;
}

function _calculateBounces(objects) {
    var bounces = new Array();

    for(var i = 0; i < objects.length; i++) {
        if(!objects[i].isWalkable) {
            bounces.push(objects[i]);
        }
    }

    return bounces;
}