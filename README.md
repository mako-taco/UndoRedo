UndoRedo.js
===========

A general purpose, functional style to the command design pattern.  
UndoRedo.js allows you to easily create undoable actions in any javascript application.

How to
===
When you want to perform an undoable action, you call 'do' with two functions as parameters:
the first function performs your action.  The second function is what will be called to undo
your action.  Use closures to your advantage here.  Ex:

    //some object-oriented javascript stuffs
    var Point = function(x,y) {
      this.x = x;
      this.y = y;
      
      //here is an action we cant to be able to undo/redo
      this.move = function(dx,dy) {
        var oldState = {
          x: this.x,
          y: this.y
        };
        
        //this function sets up the action and performs it
        UndoRedo.do( 
          //this guy will do the action
          function() {
            this.x += dx;
            this.y += dy;
          }, 
          
          //this guy will undo the action
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

