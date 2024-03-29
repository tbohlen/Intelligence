/*
IEarth v1.0

Author: Turner Bohlen<turnerbohlen@gmail.com>(www.turnerbohlen.com)
Date: April 20th, 2012

IEarth is the object that runs Earth. It models a grid of squares connected
toroidally, and can place food on that map according to certain rules.

IEarth is set up to allow all animals on the map the same input and prevent
their actions from effecting one another. If two animals land on the same
food space at the same time, they both get the food.

Eventually I may implement an event based model that allows all animals
to execute effectively concurrently and compete in that way.

METHODS:
init - sets up the board for use
start - begins the simulation
executeStep - executes a single step in the simulation
dropFood - adds a piece of the food to the map if allowed by
the parameters. This is registered as a preStepAction.
changeLocaleContends - implements all the content changes that occured during the turn
randomLocation - generated a random locale on the map and returns it
getLocale
getLocales
locationsInCircle
registerInputAction
registerProcessAction
removeInputAction
removeProcesAction
*/

var I_EARTH_MAX_FOOD_DENSITY = 0.05;
var I_EARTH_ADD_FOOD_PROBABILITY = 0.5;

function IEarth () {
    this.frameRate = 30; // calculations per second
	this.preStepActions = []; // array of actions that need to happen before a step
	this.inputActions = []; // array of actions to gather inputs CANNOT change a board
	this.processActions = []; // array of actions to process inputs
	this.postStepActions = []; // array of actions to happen after the step
	this.stepNumber = 0; // the number of steps that have passed
	this.intervalID = null; // the ID of the interval calling executeStep
	this.go = false; // if true, calls executeStep every 30 milliseconds
    this.board = new IBoard();
}
// NO TEST FOR THIS FUNCTION
IEarth.prototype.init = function () { // method to initiate the earth
	this.preStepActions.push(this.dropFood.bind(this));
	this.postStepActions.push(this.changeLocaleContents);
};
// NO TEST FOR THIS FUNCTION
IEarth.prototype.startSteps = function () { // method to start the event loop the runs earth
	this.go = true;
	this.intervalID = window.setInterval(this.executeStep.bind(this), 1000/30);
};
// NO TEST FOR THIS FUNCTION
IEarth.prototype.executeStep = function () { // method that executes a single step
    if(!this.go) {
        console.log("Executing");
		window.clearInterval(this.intervalID);
	}
	else {
		this.stepNumber++;
		for(var i = 0; i < this.preStepActions.length; i++) {
			this.preStepActions[i]();
		}
		for(var i = 0; i < this.inputActions.length; i++) {
			this.inputActions[i]();
		}
		for(var i = 0; i < this.processActions.length; i++) {
			this.processActions[i]();
		}
		for(var i = 0; i < this.postStepActions.length; i++) {
			this.postStepActions[i]();
		}
	}
};

// method that adds food to the map if possible
// NO TEST FOR THIS FUNCTION
IEarth.prototype.dropFood = function () {
	if(this.totalFood < (I_EARTH_MAX_FOOD_DENSITY*this.board.sideLength*this.board.sideLength) && Math.random() <= I_EARTH_ADD_FOOD_PROBABILITY) {
		var added = false;
		while(!added) {
			var x = IHelper.iRandomInt(0, this.board.sideLength);
			var y = IHelper.iRandomInt(0, this.board.sideLength);
			added = this.board.addFood([x, y]);
		}
	}
};
// NO TEST FOR THIS FUNCTION
IEarth.prototype.registerInputAction = function(method) {
    this.inputActions.push(method);
};
// NO TEST FOR THIS FUNCTION
IEarth.prototype.registerProcessAction = function(method) {
    this.processActions.push(method);
};
IEarth.prototype.removeInputAction = function(method) {
    var index = this.inputActions.indexOf(method);
    if(index != -1) {
        this.inputActions.splice(index, 1);
    }
};
IEarth.prototype.removeProcessAction = function(method) {
    var index = this.processActions.indexOf(method);
    if(index != -1) {
        this.processActions.splice(index, 1);
    }
};