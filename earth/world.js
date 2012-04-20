/*
World v1.0

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
*/

var I_EARTH_SIZE = 20;
var I_EARTH_MAX_FOOD_DENSITY = 0.05;
var I_EARTH_ADD_FOOD_PROBABILITY = 0.2;

var IEarth = {
	preStepActions: [] // array of actions that need to happen before a step
	, inputActions: [] // array of actions to gather inputs CANNOT change board
	, processActions: [] // array of actions to process inputs
	, postStepActions: [] // array of actions to happen after the step
	, earthArray: [] // array of Locales on Earth
	, stepNumber: 0 // the number of steps that have passed
	, intervalID: null // the ID of the interval calling executeStep
	, go: false // if true, calls executeStep every 30 milliseconds
	, totalFood: 0 // the total number of pieces of food on the map
	, localeContentChanges: [] // array of content changes made during the turn
	, init: function () { // method to initiate the world
		for(int i = 0; i < I_EARTH_SIZE; i++) {
			var column = [];
			for(int j = 0; j < I_EARTH_SIZE; j++) {
				column.push(new ILocale());
			}
			this.earthArray.push(column);
		}
		this.preStepActions.push(this.dropFood);
		this.postStepActions.push(this.changeLocaleContents);
	}
	, start: function () { // method to start the event loop the runs earth
		this.go = true;
		this.intervalID = window.setInterval(this.executeStep, 30);
	}
	, executeStep: function () { // method that executes a single step
		if(!this.go) {
			window.clearInterval(this.intervalID);
		}
		else {
			this.stepNumber++;
			for(var action in this.preStepActions) {
				action(this);
			}
			for(var action in this.inputActions) {
				action(this);
			}
			for(var action in this.processActions) {
				action(this);
			}
			for(var action in this.postStepActions) {
				action(this);
			}
		}
	}
	, dropFood: function () { // method that adds food to the map if possible
		if(this.totalFood < (I_EARTH_MAX_FOOD_DENSITY*I_EARTH_SIZE*I_EARTH_SIZE)) {
			if(Math.random() <= I_EARTH_ADD_FOOD_PROBABILITY) {
				var added = false;
				while(!added) {
					var x = iRandomInt(0, I_EARTH_SIZE);
					var y = iRandomInt(0, I_EARTH_SIZE);
					var locale = this.earthArray[x][y]
					if(!locale.contents) {
						locale.contents = "food";
						this.totalFood++;
						added = true;
					}
				}
			}
		}
	}
	, changeLocaleContents: function () { // method to implement changes to the contents of locales that occured during the last step
		for(var change in this.localeContentChanges) {
			this.earthArray[change.x][change.y].contents = change.contents;
		}
	}
};