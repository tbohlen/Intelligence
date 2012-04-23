/**
 * @alias IBoardTests
 * @author Turner Bohlen [turnerbohlen@gmail.com]
 * @date April 22nd, 2012
 * @version 1.0
 * @since 1.0
 * @classDescription IBoardTests contains all the unit tests for IBoard
 */
var IBoardTests = {
    _TEST_boardInit_arrayWidth: function () {
        var board = new IBoard();
        if(board.array.length == board.sideLength) {
            return true;
        }
        return false;
    }
    , _TEST_boardInit_arrayHeight: function () {
        var board = new IBoard();
        for(var i = 0; i < board.array.length; i++) {
            if(board.array[i].length != board.sideLength) {
                return false;
            }
        }
        return true;
    }
    , _TEST_boardChangeContents_CornerCoords_Change: function () {
        var board = new IBoard();
        board.changeLocaleContents([0, 0], "changed1");
        board.changeLocaleContents([0, board.sideLength - 1], "changed2");
        board.changeLocaleContents([board.sideLength - 1, 0], "changed3");
        board.changeLocaleContents([board.sideLength - 1, board.sideLength - 1], "changed4");
        if(board.array[0][0].contents != "changed1") {
            return false;
        }
        if(board.array[0][board.sideLength - 1].contents != "changed2") {
            return false;
        }
        if(board.array[board.sideLength - 1][0].contents != "changed3") {
            return false;
        }
        if(board.array[board.sideLength - 1][board.sideLength - 1].contents != "changed4") {
            return false;
        }
        
        return true;
    }
    , _TEST_boardChangeContents_BadCoords_Ignore: function () {
        var board = new IBoard();
        board.changeLocaleContents([-1, 0], "changed1");
        board.changeLocaleContents([0, -1], "changed2");
        board.changeLocaleContents([0 , board.sideLength*2], "changed3");
        board.changeLocaleContents([board.sideLength*2, 0], "changed4");
        board.changeLocaleContents([board.sideLength*2, -10], "changed5");
        if(board.array[-1][0].contents != "changed1") {
            return false;
        }
        if(board.array[0][-1].contents != "changed2") {
            return false;
        }
        if(board.array[0][board.sideLength*2].contents != "changed3") {
            return false;
        }
        if(board.array[board.sideLength*2][0].contents != "changed4") {
            return false;
        }
        if(board.array[board.sideLength*2][-10].contents != "changed5") {
            return false;
        }
        return true;

    }
    , _TEST_boardChangeContents_NullContents_Change: function () {
        var board = new IBoard();
        board.changeLoclaeContents([0, 0], "changed");
        board.changeLoclaeContents([0, 0], null);
        if(board.array[0][0].contents != null) {
            return false;
        }
        return true;
    }
    , _TEST_arrayCompare: function () {
        var a = [0, 1, 3, 2];
        var b = [0, 1, 2, 3];
        if(a.compare(b)) {
            return true;
        }
        return false;
    }
    , _TEST_arrayCompare_nestedArrays: function () {
        var a = [[3, 2], 0, 1,];
        var b = [0, 1, [2, 3]];
        if(a.compare(b)) {
            return true;
        }
        return false;
    }
    , _TEST_boardRandomLocation_XOnBoard: function () {
        var board = new IBoard();
        var random = board.randomLocation();
        if(random[0] < 0 || random[0] >= board.sideLength) {
            return false;
        }
        return true;
    }
    , _TEST_boardRandomLocation_YOnBoard: function () {
        var board = new IBoard();
        var random = board.randomLocation();
        if(random[1] < 0 || random[1] >= board.sideLength) {
            return false;
        }
        return true;
    }
    , _TEST_boardGetLocale_goodCoords_return: function () {
        var board = new IBoard();
        board.changeLocaleContents([0, 0], "changed");
        var locale = board.getLocale([0, 0]);
        if(locale.contents != "changed") {
            return false;
        }
        return true;
    }
    , _TEST_boardGetLocale_badCoords_returnNull: function () {
        var board = new IBoard();
        board.changeLocaleContents([-1, 0], "changed1");
        board.changeLocaleContents([0, -1], "changed2");
        board.changeLocaleContents([0 , board.sideLength*2], "changed3");
        board.changeLocaleContents([board.sideLength*2, 0], "changed4");
        board.changeLocaleContents([board.sideLength*2, -10], "changed5");
        var locale1 = board.getLocale();
        var locale2 = board.getLocale();
        var locale3 = board.getLocale();
        var locale4 = board.getLocale();
        var locale5 = board.getLocale();
                                
        if(locale1 != null) {
            return false;
        }
        if(locale2 != null) {
            return false;
        }
        if(locale3 != null) {
            return false;
        }
        if(locale4 != null) {
            return false;
        }
        if(locale5 != null) {
            return false;
        }
        return true;
    }
    , _TEST_boardGetLocales_oneBadCoord_returnNull: function () {
        var board = new IBoard();
        board.changeLocaleContents([board.sideLength-1, board.sideLength-1], "changed2");
        var locales = board.getLocales([[0, -1], [board.sideLength-1, board.sideLength-1]]);
                                
        if(!locales.iCompare([null, board.array[board.sideLength-1,board.sideLength-1]])) {
            return false;
        }
        return true;
    }
    , _TEST_boardGetLocales_manyGoodCoords_return: function () {
        var board = new IBoard();
        board.changeLocaleContents([0, 0], "changed1");
        board.changeLocaleContents([board.sideLength-1, board.sideLength-1], "changed2");
        var locales = board.getLocales([[0, 0], [board.sideLength-1, board.sideLength-1]]);
                                
        if(!locales.iCompare([board.array[0][0], board.array[board.sideLength-1,board.sideLength-1]])) {
            return false;
        }
        return true;
    }
    , _TEST_boardLocationsInCircle_zeroRadius_firstPoint: function () {
        var board = new IBoard();
        var locs = board.locationsInCircle([0, 0], 0);
        if(!locs.iCompare([[0, 0]])) {
            return false;
        }
        return true;
    }
    , _TEST_boardLocationsInCircle_badPoint_emptyArray: function () {
        var board = new IBoard();
        var locs1 = board.locationsInCircle([-1, 0], 2);
        var locs2 = board.locationsInCircle([0, -1], 2);
        var locs3 = board.locationsInCircle([board.sideLength*2, 0], 2);
        var locs4 = board.locationsInCircle([0, board.sideLength*2], 2);
        var locs5 = board.locationsInCircle([-1, board.sideLength*2], 2);
        if(locs1.length != 0) {
            return false;
        }
        if(locs2.length != 0) {
            return false;
        }
        if(locs3.length != 0) {
            return false;
        }
        if(locs4.length != 0) {
            return false;
        }
        if(locs5.length != 0) {
            return false;
        }
        return true;
    }
    // NOTE test will not function with board.sideLength less than 5
    , _TEST_boardLocationsInCircle_goodPoint_returnList: function () {
        var board = new IBoard();
        var locs1 = board.locationsInCircle([2,2], 2);
        var expeced = [[2, 2], [2, 3], [2, 4], [2, 1], [2, 0], [3, 2], [4, 3]
                       , [1, 2], [0, 2], [3, 3], [1, 1], [1, 3], [3, 1]];
        if(!locs1.iCompare(expected)) {
            return false;
        }
        return true;
    }
    , _TEST_boardWrapCoordinates_negativeY: function () {
        var board = new IBoard();
        var newCoords = board.wrapCoordinates([0, -1]);
        if(newCoords != [0, board.sideLength-1]) {
            return false;
        }
        return true;
    }
    , _TEST_boardWrapCoordinates_negativeX: function () {
        var board = new IBoard();
        var newCoords = board.wrapCoordinates([-1, 0]);
        if(newCoords != [board.sideLength-1, 0]) {
            return false;
        }
        return true;
    }
    , _TEST_boardWrapCoordinates_largeY: function () {
        var board = new IBoard();
        var newCoords = board.wrapCoordinates([0, board.sideLength + 10]);
        if(newCoords != [0, 10]) {
            return false;
        }
        return true;
    }
    , _TEST_boardWrapCoordinates_largeX: function () {
        var board = new IBoard();
        var newCoords = board.wrapCoordinates([board.sideLength + 10, 0]);
        if(newCoords != [10, 0]) {
            return false;
        }
        return true;
    }
    , _TEST_boardAddFood_badCoords_false: function () {
        var board = new IBoard();
        if(board.addFood([-1, -1])) {
            return false;
        }
        return true;
    }
    , _TEST_boardAddFood_alreadyThere_false: function () {
        var baord = new IBoard();
        board.changeLocaleContent([0,0], "food");
        if(baord.addFood([0,0])) {
            return false;
        }
        return true;
    }
    , _TEST_baordAddFood_allGood_true: function () {
        var board = new IBoard();
        if(!board.addFood([0, 0])) {
            return false;
        }
        return true;
    }
};

Array.prototype.iCompare = function(testArr) {
    if (this.length != testArr.length) {
        return false;
    }
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].iCompare) { 
            if (!this[i].iCompare(testArr[i])) {
                return false;
            }
        }
        if (this[i] !== testArr[i]) {
            return false;
        }
    }
    return true;
}

ITesting.registerTestSuite(IBoardTests);