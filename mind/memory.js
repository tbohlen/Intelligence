/*
 * @alias IMemory
 * @author Turner Bohlen [turnerbohlen@gmail.com]
 * @date: April 20th, 2012
 * @version 1.0
 * @since 1.0
 * 
 *  handleInput is the primary method. It needs to:
 * 	Store this input as the result of the last action
 * 	Retrieve and return memories relevant to the input
 * 
 * Database entries:
 * input: [data, data, data, data]
 * data is {act: act, result: result}
 */
 
/*
 * @classDescription IMemory is the custon storage/database for Mind.
 * @constructor
 * 
 * METHODS
 * storeInput
 * handleInput
 * storeResults
 * storeAction
 */
function IMemory (input) {
	this.fullDatabase = {}; // database of complete inputs mapped to outputs
	this.lastInput = null;
}

/*
 * 
 * 
*/
IMemory.prototype.handleInput = function (input) {
	// store this input as the result of the last action
	this.storeResult(input);
	// store this input as the latest input
	this.lastInput = input;
	this.storeInput(input);
	// find and return memories
	var memories = this.retrieveMemories(input);
	return memories
}
/*
 * 
 * 
*/
IMemory.prototype.storeInput = function (input) {
	this.lastInput = input;
	if(input in this.fullDatabase) {
		this.fullDatabase[input].push();
	}
	else {
		this.fullDatabase[input] = [{act:null, result:null}];
	}
}
IMemory.prototype.retrieveMemories = function (input) {
	return this.fullDatabase[input];
}
IMemory.prototype.storeResults = function (result) {
	if(this.lastInput) {
		var entry = this.fullDatabase[this.lastInput];
		entry[entry.length - 1].result = result;
	}
}
IMemory.prototype.storeAction = function (act) {
	if(this.lastInput) {
		var entry = this.fullDatabase[this.lastInput];
		entry[entry.length - 1].act = act;
	}
}