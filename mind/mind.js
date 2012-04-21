/*
IMind v1.0

Author: Turner Bohlen<turnerbohlen@gmail.com>(www.turnerbohlen.com)
Date: April 20th, 2012

IMind is the class that controls the entire Mind, from preprocessor to memory.

METHODS
calculate
*/

function IMind() {
	this.preprocessor = new Preprocessor();
	this.consciousness = new Consciousness();
	this.memory = new Memory();
}

IMind.prototype.calculate = function(input, actions) {
	var processedInput = this.preprocessor.process(input)
	var relevantMemories = this.memory.retrieveMemories(processedInput);
	this.consciousness.chooseAction(input, relevantMemories, actions);
	return action;
}
