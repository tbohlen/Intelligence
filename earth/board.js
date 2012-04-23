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
    this.sideLength = 20;
	for(int i = 0; i < this.board.sideLength; i++) {
		var column = [];
		for(int j = 0; j < this.sideLength; j++) {
			column.push(new ILocale());
		}
		this.array.push(column);
	}
}
// method to implement changes to the contents of locales that occured during the last step
IBoard.prototype.changeLocaleContents = function (loc, newContent) {
	this.array[loc[0]][loc[1]].contents = newContent;
}
// chooses and returns a random location on earth
IBoard.prototype.randomLocation = function () {
	var x = iRandomInt(0, this.sideLength);
	var y = iRandomInt(0, this.sideLength);
	return [x, y];
}
// returns the locale object at the given earth location
IBoard.prototype.getLocale = function (coordinates) {
	if(coordinates[0] > 0 && coordinates[0] < this.sideLength && coordinates[1] > 0 && coordinates[1] < this.sideLength) {
		return this.earthArray[coordinates[0]][coordinates[1]]
	}
	else {
		return null;
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
    if(center[0] >= this.sideLength || center[1] >= this.sideLength
       || center[0] < 0 || center[1] < 0) {
           return [];
    }
	var result = []
	for(var i = -radius; i < radius+1;i++) {
		for(var j = -Math.abs(i); j < Math.abs(i); j++) {
            var x = center[0]+i;
            var y = center[1]+j;
			result.push(this.wrapCoordinates([x, y]));
		}
	}
	return result;
}
IBoard.prototype.wrapCoordinates = function (coordinates) {
    coordinates[0] = coordinates[0]%this.sideLength;
    coordinates[1] = coordinates[1]%this.sideLength;
	if(coordinates[0] < 0) {
		coordinates[0] += this.sideLength;
	}
	if(coordinates[1] < 0) {
		coordinates[1] += this.sideLength;
	}
    return coordinates;
}

IBoard.prototype.addFood = function (coordinates) {
    if(coordinates[0] >= this.sideLength || coordinates[1] >= this.sideLength
       || coordinates[0] < 0 || coordinates[1] < 0) {
           return false;
    }
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
INullBoard.prototype.wrapCoordinates =function(coordinates) {
    return coordinates;
}
INullBoard.prototype.addFood = function (coordinates) {
}
