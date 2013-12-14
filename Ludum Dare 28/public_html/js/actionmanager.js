/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function whatHappensIf(action) {
    var result;
    
    if(action.isMove) {
        result = ifMove(action);
    } else if (action.isAttackRanged) {
        
    } else if (action.isAttackMelee) {
        
    } else {
        result = undefined;
    }
    
    return true;
}

function ifMove(moveAction) {
    var result;
    
    var objects = moveAction.toChunk.whatIsAt(moveAction.x, moveAction.y);
    var bounces = new Array();

    for(var i = 0; i < objects.length; i++) {
        if(!objects[i].isWalkable) {
            bounces.push(objects[i]);
        }
    }

    if(bounces.length === 0) {
        result = new ResultNothing();
    } else {
        result = new ResultBounce(bounces);
    }
    return result;
}

function ifAttackRanged(attackAction) {
    var result;
    
    
    
    return result;
}