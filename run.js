/*
Run v1.0

Author: Turner Bohlen<turnerbohlen@gmail.com>(www.turnerbohlen.com)
Date: April 20th, 2012

Run executes the program, beginning the stepping loop.
*/
$(document).ready(function() {
    ITesting.registerTestSuite(IEarthTests);
    ITesting.registerTestSuite(IBodyTests);
    ITesting.registerTestSuite(IBoardTests);
    console.log("Testing Results:" + ITesting.runTests().toString());
    
    var earth = new IEarth();
    var animal = new IBody(earth);
    var visualizer = new IVisualizer(earth);
    earth.init();
    earth.registerInputAction(animal.gatherInput.bind(animal));
    earth.registerProcessAction(animal.processInput.bind(animal));
    visualizer.animals.push(animal);
    earth.preStepActions.push(visualizer.draw.bind(visualizer));
    earth.startSteps();
});