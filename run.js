/*
Run v1.0

Author: Turner Bohlen<turnerbohlen@gmail.com>(www.turnerbohlen.com)
Date: April 20th, 2012

Run executes the program, beginning the stepping loop.
*/

IEarth.init()
var animal = new IBody(IEarth);
IEarth.inputActions.push(animal.gatherInput);
IEarth.processActions.push(animal.processInput);

IEarth.start();