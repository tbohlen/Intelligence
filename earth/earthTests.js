/**
 * @alias IEarthTests
 * @author Turner Bohlen [turnerbohlen@gmail.com]
 * @date April 22nd, 2012
 * @version 1.0
 * @since 1.0
 * @classDescription IEarthTests contains all the unit tests for IEarth
 */
var IEarthTests = {
    setup: function () {
        this.earth = new IEarth()
    }
    , teardown: function () {
         
    }
    , _TEST_INIT: function () {
        var earth = new IEarth();
        earth.board = new INullBoard();
        return false;
        return true;
    }
};

ITesting.registerTestSuite(IEarthTests);
 
/*
Things to test:

init creates board with correct dimensions

init registers food

init registers changing spaces

