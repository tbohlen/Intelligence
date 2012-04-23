/**
 * @alias IBoard
 * @author Turner Bohlen [turnerbohlen@gmail.com]
 * @date April 22nd, 2012
 * @version 1.0
 * @since 1.0
 * @classDescription IBoard implements the game board that IEarth manages
 */
function IBoard () {
    this.array = []; // array of Locales on Earth
	for(int i = 0; i < I_EARTH_SIZE; i++) {
		var column = [];
		for(int j = 0; j < I_EARTH_SIZE; j++) {
			column.push(new ILocale());
		}
		this.array.push(column);
	}
}
// method to implement changes to the contents of locales that occured during the last step
IBoard.prototype.changeLocaleContents = function () {
	for(var change in this.localeContentChanges) {
		this.earthArray[change.loc[0]][change.loc[1]].contents = change.contents;
	}
}
// chooses and returns a random location on earth
IBoard.prototype.randomLocation = function () {
	var x = iRandomInt(0, I_EARTH_SIZE);
	var y = iRandomInt(0, I_EARTH_SIZE);
	return [x, y];
}
// returns the locale object at the given earth location
IBoard.prototype.getLocale = function (coordinates) {
	if(coordinates[0] > 0 && coordinates[0] < I_EARTH_SIZE && coordinates[1] > 0 && coordinates[1] < I_EARTH_SIZE) {
		return this.earthArray[coordinates[0]][coordinates[1]]
	}
	else {
		return null
	}
}
// returns the locale objects ad the given earth locations
IBoard.prototype.getLocales = function(locations) {
	var result = [];
	for(location in locations) {
		result.push(this.getLocale(location));
	}
	return result;
}
// returns a list of locations within the circle
IBoard.prototype.locationsInCircle = function(center, radius) {
	var result = []
	for(var i = -radius; i < radius+1;i++) {
		for(var j = -Math.abs(i); j < Math.abs(i); j++) {
			result.push([i, j]);
		}
	}
	return result;
}

IBoard.prototype.addFood = function (coordinates) {
    var locale = this.array[coordinates[0]][coordinates[0]];
    if(!locale.contents) {
    	locale.contents = "food";
    	this.totalFood++;
        return true;
    }
    else {
        return false;
    }
}

/**
 * @alias INullBoard
 * @author Turner Bohlen [turnerbohlen@gmail.com]
 * @date April 22nd, 2012
 * @version 1.0
 * @since 1.0
 * @classDescription INullBoard is IBoard with stripped down methods for testing
 */

function INullBoard () {
}
INullBoard.prototype.changeLocaleContents = function () {
}
INullBoard.prototype.randomLocation = function () {
	return [0, 0];
}
INullBoard.prototype.getLocale = function (coordinates) {
    return new ILocale();
}
INullBoard.prototype.getLocales = function(locations) {
    return [new ILocale(), new ILocale()];
}
INullBoard.prototype.locationsInCircle = function(center, radius) {
    return [[0, 1], [0, 0], [1, 0]];
}
INullBoard.prototype.addFood = function (coordinates) {
}
