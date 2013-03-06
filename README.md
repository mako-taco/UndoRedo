UndoRedo.js
===========

A general purpose, functional style to the command design pattern.  
UndoRedo.js allows you to easily create undoable actions in any javascript application.

UndoRedo.do
==
Pass in two functions, the 'do' and 'undo' functions.  UndoRedo.do will perform the 'do'
function and push the action onto the UndoRedo stack.
```javascript    
UndoRedo.do( function() {
    //do stuff here
}, function() {
    //undo stuff here
});
```

UndoRedo.undo
==
Undoes the last action.  Console.warns if there are no actions left to undo.
```javascript
UndoRedo.undo();
```

UndoRedo.redo
==
Redoes the last undone action.  Console.warns if there are no actions to redo.
```javascript
UndoRedo.redo();
```

Example
===
When you want to perform an undoable action, you call 'do' with two functions as parameters:
the first function performs your action.  The second function is what will be called to undo
your action.  Use closures to your advantage here.  Ex:
```javascript
//some object-oriented javascript stuffs
var Point = function(x,y) {
    this.x = x;
    this.y = y;
  
    //here is an action we cant to be able to undo/redo
    this.move = function(dx,dy) {
        
        //this variable will be saved in the undo function's closure
        var oldState = {
            x: this.x,
            y: this.y
        };
        
        //this function sets up the action and performs it
        UndoRedo.do( 
            //the 'do' or 'redo' function
            function() {
                this.x += dx;
                this.y += dy;
            }, 
          
            //the 'undo' function
            function() {
                this.x = oldState.x;
                this.y = oldState.y;
            });
    }
}

//do some actions...
var p = new Point(0,0);
p.move(5,10);
console.log(p);
p.move(2,1);

//test it out
UndoRedo.undo();
console.log(p);
UndoRedo.undo();
console.log(p);
UndoRedo.redo();
console.log(p);
console.log(p);
```
