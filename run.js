/*
Run v1.0

Author: Turner Bohlen<turnerbohlen@gmail.com>(www.turnerbohlen.com)
Date: April 20th, 2012

Run executes the program, beginning the stepping loop.
*/

var earth = new IEarth();
earth.init()
var animal = new IBody(earth);
earth.registerInputAction(animal.gatherInput);
earth.registerProcessAction(animal.processInput);
var visualizer = new IVisualizer(earth);
earth.preStepActions.push(visualizer.draw);

IEarth.start();