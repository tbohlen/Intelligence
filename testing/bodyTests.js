/**
 * @alias IBodyTests
 * @author Turner Bohlen [turnerbohlen@gmail.com]
 * @date April 22nd, 2012
 * @version 1.0
 * @since 1.0
 * @classDescription IBodyTests contains all the unit tests for body
 */
var IBodyTests = {
    setup: function () {
         
    }
    , teardown: function () {
         
    }
    , _TEST_
};

ITesting.registerTestSuite(IBodyTests);
 
/*
Things to test:

act with each string in actions triggers the correct method and changes
the energy appropriately.

act with a string that is not in action or a non-string throws an error.

eat when the animals location has food removes that food after one turn
and increases the animals energy by I_FOOD_ENERGY. If this results in an energy
higher than maxEnergy, energy is reduced to maxEnergy

eat when the animals location does not have food does nothing

move changes the coordinates of the animal based on the input.

move and causing the animal to move off the board results in the
position wrapping around to the other side of the board.

gatherInput returns the correct collection of inputs for given surrounding,
sight radius, and energy.

GatherInput without earth ruturns without sight

GatherInput without radius assumes radius = 1

GatherInput with no max energy returns hunger of 0

GatherInput when on edge of earth correctly wraps

processInput triggers some action

*/