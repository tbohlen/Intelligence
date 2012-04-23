/**
 *
 * The general testing plan is to register test objects with ITesting and then
 * run each method of those objects that begins with "_TEST_"
 *
 * Tests must call their own setup and teardown methods and must return either
 * true or false to indicate if they succeeded or not.
 *
 * @alias ITesting
 * @author Turner Bohlen [turnerbohlen@gmail.com]
 * @version 1.0
 * @since 1.0
 * @classDescription UnitTesting program for Intelligence.
 */
var ITesting = {
    /**
    * Array of the testSuite objects that will be run by runTests
    *
    * @alias ITesting.testSuites
    * @property (Array)
    */
    testSuites: []
    /**
    * For each suite registered, execute each test method and test for success.
    * If a method fails, return [false, testName]. If everything succeeds,
    8 return [true, null];
    *
    * @alias ITesting.runTests
    * @memberOf ITesting
    * @method
    * @return (Array) Returns a boolean indicating success and the name of the method that failed, if any
    */
    , runTests: function () {
    for(var i = 0; i < this.testSuites.length; i++) {
        var suite = this.testSuites[i];
        for(var prop in suite) {
            if(prop.match(/^_TEST_*/)) {
                if(!suite[prop]()) {
                    return prop;
                }
            }
        }
    }
        
    return true;
    }
    /**
    * @alias ITesting.runTests
    * @memberOf ITesting
    * @method
    * @return (string) Returns null if no error or the name of the test that failed
    */
    , registerTestSuite: function (suite) {
    this.testSuites.push(suite);
    }
};