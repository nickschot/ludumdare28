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
    
    var bounces = _calculateBounces(moveAction.toChunk.whatIsAt(moveAction.x, moveAction.y));
    
    if(bounces.length === 0) {
        result = new ResultNothing();
    } else {
        result = new ResultBounce(bounces);
    }

    return result;
}

function ifAttackRanged(attackAction) {
    var result;
    
    var bounces = _calculateBounces(attackAction.toChunk.whatIsAt(attackAction.x, moveAction.y));
    
    if(bounces.length === 0) {
        result = new ResultNothing();
    } else {
        result = new ResultBounce(bounces);
    }
    
    return result;
}

function ifAttackMelee(attackAction) {
    var result;
    
    var bounces = _calculateBounces(attackAction.toChunk.whatIsAt(attackAction.x, moveAction.y));
    
    if(bounces.length === 0) {
        result = new ResultNothing();
    } else {
        result = new ResultBounce(bounces);
    }
    
    return result;
}

function _calculateBounces(objects) {
    var objects = moveAction.toChunk.whatIsAt(moveAction.x, moveAction.y);
    var bounces = new Array();

    for(var i = 0; i < objects.length; i++) {
        if(!objects[i].isWalkable) {
            bounces.push(objects[i]);
        }
    }

    return bounces;
}