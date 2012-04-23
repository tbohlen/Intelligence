/**
 * @alias IConsciousness
 * @author Turner Bohlen [turnerbohlen@gmail.com]
 * @date April 22nd, 2012
 * @version 1.0
 * @since 1.0
 */
 
 /**
  * @classDescription IConsciousness chooses an action intelligently based on an input and memories
  * @constructor
  */
function IConsciousness () {
	
}

/*
 * @alias IConsciousness.chooseAction
 * @memberOf IConsciousness
 * @method
 * @version 1.0
 * @since 1.0
 * 
 * @param (Dictionary) input The input from the body that we are reacting to
 * @param (Array) memories The memories associated with this input in Memory
 * @param (List) actions A dictionary of actions that the body can execute
 * @return (String) Returns the key to the action that it wants to execute
 */
IConsciousness.prototype.chooseAction = function (input, memories, actions) {
	// if we have never had this input before then choose an action at random
	if memories.length == 0
	// if we have seen in before
	// if we have tried everything, do the most comforting action
	// if we have tried only a few actions
	// if one of those actions was very comforting, do it again
	// otherwise choose an action randomly
}