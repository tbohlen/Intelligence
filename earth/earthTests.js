/**
 * @alias IEarthTests
 * @author Turner Bohlen [turnerbohlen@gmail.com]
 * @date April 22nd, 2012
 * @version 1.0
 * @since 1.0
 * @classDescription IEarthTests contains all the unit tests for IEarth
 */
var IEarthTests = {
    , _TEST_removeInputAction_actionNotStored_dontCrash: function () {
        var earth = new IEarth(); // not ideal as this creates a board
        earth.board = new INullBoard();
        function doNothing() {
            // do nothing
        }
        try {
            earth.removeInputAction(doNothing);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    , _TEST_removeInputAction_actionNotStored_dontCrash: function () {
        var earth = new IEarth(); // not ideal as this creates a board
        earth.board = new INullBoard();
        function doNothing() {
            // do nothing
        }
        try {
            earth.removeProcessAction(doNothing);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    , _TEST_removeInputAction_allWell_remove: function () {
        var earth = new IEarth(); // not ideal as this creates a board
        earth.board = new INullBoard();
        function doNothing() {
            // do nothing
        }
        earth.registerInputAction(doNothing);
        earth.removeInputAction(doNothing);
        if(earth.inputActions.indexOf(doNothing) != -1) {
            return false;
        }
        return true;
    }
    , _TEST_removeProcessAction_allWell_remove: function () {
        var earth = new IEarth(); // not ideal as this creates a board
        earth.board = new INullBoard();
        function doNothing() {
            // do nothing
        }
        earth.registerProcessAction(doNothing);
        earth.removeProcessAction(doNothing);
        if(earth.processActions.indexOf(doNothing) != -1) {
            return false;
        }
        return true;
    }
};

ITesting.registerTestSuite(IEarthTests);
 
/*
Things to test:

init creates board with correct dimensions

init registers food

init registers changing spaces

