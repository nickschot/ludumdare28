var inputKeyObject = {
    "backspace": 8,
    "tab": 9,
    "enter": 13,
    "shift": 16,
    "ctrl": 17,
    "alt": 18,
    "pause/break": 19,
    "caps lock": 20,
    "escape": 27,
    "spacebar": 32,
    "page up": 33,
    "page down": 34,
    "end": 35,
    "home": 36,
    "left arrow": 37,
    "up arrow": 38,
    "right arrow": 39,
    "down arrow": 40,
    "insert": 45,
    "delete": 46,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    "a": 65,
    "b": 66,
    "c": 67,
    "d": 68,
    "e": 69,
    "f": 70,
    "g": 71,
    "h": 72,
    "i": 73,
    "j": 74,
    "k": 75,
    "l": 76,
    "m": 77,
    "n": 78,
    "o": 79,
    "p": 80,
    "q": 81,
    "r": 82,
    "s": 83,
    "t": 84,
    "u": 85,
    "v": 86,
    "w": 87,
    "x": 88,
    "y": 89,
    "z": 90,
    //"left window key": 91,
    //"right window key": 92,
    "select key": 93,
    "numpad 0": 96,
    "numpad 1": 97,
    "numpad 2": 98,
    "numpad 3": 99,
    "numpad 4": 100,
    "numpad 5": 101,
    "numpad 6": 102,
    "numpad 7": 103,
    "numpad 8": 104,
    "numpad 9": 105,
    "multiply": 106,
    "add": 107,
    "subtract": 109,
    "decimal point": 110,
    "divide": 111,
    "f1": 112,
    "f2": 113,
    "f3": 114,
    "f4": 115,
    //"f5": 116,
    "f6": 117,
    "f7": 118,
    "f8": 119,
    "f9": 120,
    "f10": 121,
    //"f11": 122,
    //"f12": 123,
    //"num lock": 144,
    "scroll lock": 145,
    "semi-colon": 186,
    "equal sign": 187,
    "comma": 188,
    "dash": 189,
    "period": 190,
    "forward slash": 191,
    "grave accent": 192,
    "open bracket": 219,
    "back slash": 220,
    "close braket": 221,
    "single quote": 222
};

var InputManager = new Class({
    initialize: function(){
        this.keysPressed = new Array();
        this.cursorPosition = {
            x: 0,
            y: 0
        };
        this.setBinds();
    },
    
    setBinds: function(){
        var self = this;
        $(document).addEvent('keydown', function(e){
            e.preventDefault();//disables default key actions
            var key = e.code;

            var keyPress = Object.keyOf(inputKeyObject, key);
            if(keyPress){
                self.keysPressed.include(keyPress);
            }
        });
        $(document).addEvent('keyup', function(e){
            var key = e.code;
            var keyUnpress = Object.keyOf(inputKeyObject, key);
            if(keyUnpress){
                e.preventDefault();//disables default key actions
                self.keysPressed.erase(keyUnpress);
            }
        });
        
        $(document).addEvent('mousemove', function(e){
            //cursor coördinates relative to the window
            var cursorX = e.event.clientX;
            var cursorY = e.event.clientY;
            
            var elem = $('main-canvas-wrapper').getFirst('canvas');
            var elemPos = elem.getPosition($(document.body));
            var elemX = elemPos.x;
            var elemY = elemPos.y;
            
            var scrollPos = $(window).getScroll();
            var scrollX = scrollPos.x;
            var scrollY = scrollPos.y;
            
            //make elemX and elemY absolute to window instead of document
            elemX -= scrollX;
            elemY -= scrollY;
            
            var elemSize = elem.getSize();
            var elemHalfWidth = elemSize.x / 2;
            var elemHalfHeight = elemSize.y / 2;
            
            var centerX = elemX + elemHalfWidth;
            var centerY = elemY + elemHalfHeight;
            
            if(cursorX >= centerX - elemHalfWidth && cursorX <= centerX + elemHalfWidth){
                self.cursorPosition.x = cursorX - centerX;
            } else if(cursorX < centerX - elemHalfWidth){
                self.cursorPosition.x = -elemHalfWidth;
            } else if(cursorX > centerX + elemHalfWidth){
                self.cursorPosition.x = elemHalfWidth;
            }
            
            if(cursorY >= centerY - elemHalfHeight && cursorY <= centerY + elemHalfHeight){
                self.cursorPosition.y = (cursorY - centerY)*-1;
            } else if(cursorY < centerY - elemHalfHeight){
                self.cursorPosition.y = elemHalfHeight;
            } else if(cursorY > centerY + elemHalfHeight){
                self.cursorPosition.y = -elemHalfHeight;
            }
        });
    },
    
    getKeyPresses: function(){
        return this.keysPressed;
    },
    
    getCursorPosition: function(){
        return this.cursorPosition;
    }
});
