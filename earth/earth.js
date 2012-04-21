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
registerContentChange
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
	, init: function () { // method to initiate the earth
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
				action();
			}
			for(var action in this.inputActions) {
				action();
			}
			for(var action in this.processActions) {
				action();
			}
			for(var action in this.postStepActions) {
				action();
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
			this.earthArray[change.loc[0]][change.loc[1]].contents = change.contents;
		}
	}
	, randomLocation: function () { // chooses and returns a random location on earth
		var x = iRandomInt(0, I_EARTH_SIZE);
		var y = iRandomInt(0, I_EARTH_SIZE);
		return [x, y];
	}
	, getLocale: function (coordinates) { // returns the locale object at the given earth location
		if(coordinates[0] > 0 && coordinates[0] < I_EARTH_SIZE && coordinates[1] > 0 && coordinates[1] < I_EARTH_SIZE) {
			return this.earthArray[coordinates[0]][coordinates[1]]
		}
		else {
			return null
		}
	}
	, getLocales: function(locations) { // returns the locale objects ad the given earth locations
		var result = [];
		for(location in locations) {
			result.push([location, this.getLocale(location)]);
		}
		return result;
	}
	, locationsInCircle: function(center, radius) { // returns a list of locations within the circle
		var result = []
		for(var i = -radius; i < radius+1;i++) {
			for(var j = -Math.abs(i); j < Math.abs(i); j++) {
				result.push([i, j]);
			}
		}
		return result;
	}
	, registerContentChange: function(loc, newContent) {
		this.localeContentChanges.push({loc: loc, contents: newContent});
	}
};