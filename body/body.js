/*
IBody v1.0

Author: Turner Bohlen<turnerbohlen@gmail.com>(www.turnerbohlen.com)
Date: April 20th, 2012

Body interperates Earth and passes that information to Mind. In addition,
it adds some of its own internal state to the set of inputs.

Body has a set of actions that it can execute. Each action is a method whose
name is listed in this.actions. The method name is mapped to its parameters
array. The array contains arrays of possible values for each parameter of the
method. These are limited to being discrete sets of values at the moment. The
method name is further mapped to any information Body needs to keep about those
methods.

Body assumes that Mind understands nothing. For this reason all actions that can
be called by mind must check all values before executing.

METHODS
act
eat
move
wait
gatherInput
processInput
calculateHunger
*/

var I_FOOD_ENERGY = 20;

function IBody(earth) {
	this.maxEnergy = 20;
	this.sightRadius = 1; // How far Body can see
	
	this.earth = earth;
	this.sightDistance = 1; // the number of squares away that can be seen as input
	this.actions = {
		move: {parameters:[[[0,1], [0, -1], [1, 0], [-1, 0]]], energy:2}
		, eat: {parameters:[], energy:1}
		, wait: {parameters:[], energy:1}}; // the actions that the body can execute
	this.energy = this.maxEnergy; // the energy that the body has right now
	this.discomfort = {hunger:0}; // discomfort metrics for body
	this.loc = this.earth.board.randomLocation(); // the location of the Body
	this.nextInput = null; // the next input to pass to Mind
}
// NOTE TO SELF change this.actions to incorporate parameters
IBody.prototype.act = function(action) {
	// subtract the energy of the action
	// act
	this.energy -= this.actions[action].energy;
	this[action]();
    if(this.checkDead()) {
        // if this animal is dead it can be removed from step calls
        this.earth.removeInputAction(this.gatherInput);
        this.earth.removeProcessAction(this.provessInput);
    }
};
IBody.prototype.eat = function() {
	// get the localeObject at our location
	// check to make sure there is food there
	// add food energy
	var locale = this.earth.getLocale(this.loc);
	if(locale.contents == "food") {
		this.energy+=I_FOOD_ENERGY;
		this.earth.board.changeLocaleContents(this.loc, null);
	}
};
IBody.prototype.move = function(direction) {
	// move in the direction indicates
	this.loc[0] += direction[0];
	this.loc[1] += direction[1];
    this.loc = this.earth.board.wrapCoordinates(this.loc);
};
IBody.prototype.wait = function() {
	// do nothing
};
IBody.prototype.gatherInput = function() {
	this.nextInput = {};
	// gather map information
	this.nextInput.sight = this.earth.getLocales(this.earth.locationsInCircle(this.loc, this.sightRadius));
	// generate discomfort information
	this.nextInput.discomfort = {hunger:this.calculateHunger()};
};
IBody.prototype.processInput = function() {
	var action = this.mind.think(this.nextInput, this.actions.keys());
	this.act(action);
};
IBody.prototype.calculateHunger = function() {
	return 1 - this.energy/this.maxEnergy;
};
IBody.prototype.checkDead = function() {
    if(this.energy <= 0) {
        return true;
    }
    return false;
};