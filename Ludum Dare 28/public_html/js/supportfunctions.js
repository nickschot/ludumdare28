/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function insertSorted(list, toAdd, sortOn) {
    var i = binarySearch(list, toAdd, sortOn);
    var result;
    
    if(i === -1) {
        result = insertAt(list, toAdd, 0);
    } else if(i >= list.length) {
        list.push(toAdd);
        result = list;
    } else {
        result = insertAt(list, toAdd, i);
    }
    
   return result;
}

//Tested
function insertAt(list, toAdd, at) {
    var begin = list.slice(0, at);
    var end   = list.slice(at, list.length);
    return begin.concat(new Array(toAdd)).concat(end);
}

//Tested
function removeAt(list, at) {
    var begin = list.slice(0, at);
    var end   = list.slice(at + 1, list.length);
    return begin.concat(end);
}

//Tested
//Returns i if found, else -1
function binarySearch(list, element, searchOn) {
    var begin = 0;
    var end = list.length - 1;
    var i = Math.floor((end - begin) / 2);
    var listA = (list[i])[searchOn];
    var addA = element[searchOn];
    
    while(begin <= end) {
       /* console.log("begin: " + begin);
        console.log("i: " + i);
        console.log("end: " + end);*/
        if(addA === listA) {
            return i;
            
        } else if (addA < listA && !list[i-1]) {
            return 0;
        } else if (addA > listA && !list[i+1]) {
            return list.length;
        } else if (addA < listA && addA > (list[i-1])[searchOn]) {
            return i - 1;
        } else if (addA > listA && list[i+1] && addA < (list[i+1])[searchOn]) {
            return i;
        } else if(addA > listA) {
            begin = i + 1;
        } else if(addA < listA) {
            end = i - 1;
        }
        i = begin + Math.floor((end - begin) / 2);
        

        listA = (list[i])[searchOn];
        
    }
    return -2;
}