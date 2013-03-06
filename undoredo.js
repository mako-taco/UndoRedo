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