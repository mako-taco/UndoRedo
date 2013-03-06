/*Copyright (c) 2013 Jake Scott
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in 
	all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE. */
 
var UndoRedo = new function() {
	
	var _doChain = [];
	var _undoChain = [];
	var _maxLength = 50;
	
	var Action =  function(up, down, name) {
		this.up = up;
		this.down = down;
		this.name = name;
	};

	this.do = function(up, down, name) {
		if(!up) {
			throw "UndoRedo.do missing required parameter 'up'."
		}
		else if(!down) {
			throw "UndoRedo.do missing required parameter 'down'."
		}
		else {
			var _action = new Action(up, down, name);
			_undoChain = [];
			_action.up();
			_doChain.push(_action);
			while(_doChain.length > _maxLength) {
				_doChain.shift();
			}
		}
	};

	this.undo = function() {
		var _undone = _doChain.pop();
		if(_undone) {
			_undone.down();
			_undoChain.push(_undone);
		}
		else {
			console.warn("Nothing to undo.");
		}
	};

	this.redo = function() {
		var _redone = _undoChain.pop();
		if(_redone) {
			_redone.up();
			_doChain.push(_redone);
		}
		else {
			console.warn("Nothing to redo");
		}
	}
}
