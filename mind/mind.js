/*
IMind

@author Turner Bohlen [turnerbohlen@gmail.com]
@date April 20th, 2012
@version 1.0
@since 1.0

IMind is the class that controls the entire Mind, from preprocessor to memory.

Its primariy method is think. In the course of processing an input we need to
	Process the input
	Store it as the result to the last action
	Retrieve memories relevant to that input
	Process those memories to select an action
	Store that action as the action of that input
	Return that action to the body.

METHODS
think - calculates an action based on an input
*/

function IMind() {
	this.preprocessor = new Preprocessor();
	this.consciousness = new Consciousness();
	this.memory = new Memory();
}

IMind.prototype.think = function (input, actions) {
	var processedInput = this.preprocessor.process(input);
	var relevantMemories = this.memory.handleInput(processedInput);
	var act = this.consciousness.chooseAction(input, relevantMemories, actions);
	this.memory.storeAction(act);
	return act;
}