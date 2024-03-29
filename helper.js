/*
Helper Function v1.0

Author: Turner Bohlen<turnerbohlen@gmail.com>(www.turnerbohlen.com)
Date: April 20th, 2012

Document containing helper functions used throughout the proram
*/
var IHelper = {
    // code thanks to developer.mozilla.org
    // Returns a random integer between min and max  
    // Using Math.round() will give you a non-uniform distribution!  
    iRandomInt: function (min, max) {
    	return Math.floor(Math.random() * (max - min)) + min;  
    }
};