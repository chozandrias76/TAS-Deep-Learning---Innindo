var robot = require("robotjs");
var fs = require("fs")

// Speed up the mouse.
// robot.setMouseDelay(2);

// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;

// for (var x = 0; x < width; x++)
// {
// 	y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }

// // Type "Hello World" then press enter.
// var robot = require("robotjs");

// // Type "Hello World".
// robot.typeString("Hello World");

// // Press enter.
// robot.keyTap("enter");

// Get pixel color under the mouse.
var robot = require("robotjs");

// Get mouse position.
var mouse = robot.getMousePos();

// Get pixel color in hex format.
// var hex;
// hex = robot.getPixelColor(mouse.x, mouse.y);
// console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y);
var Jimp = require("jimp");

var dt = new Date();

const fullDate = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + "/";
for(var i = (new Date().getSeconds()); (new Date().getSeconds()) <= (dt.getSeconds()+10); i++){
	var screen = robot.screen.capture(0,0,1920,1080);

	var image = new Jimp(screen.width, screen.height, function(err, img) {
	img.bitmap.data = screen.image;
	img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
		var red   = img.bitmap.data[ idx + 0 ];
		var blue  = img.bitmap.data[ idx + 2 ];
		img.bitmap.data[ idx + 0 ] = blue;
		img.bitmap.data[ idx + 2 ] = red;
		
	});
	if(i & 1){
		img.write("./images/" + fullDate + "/ right monitor " + (new Date().getHours()) + "-" + (new Date().getMinutes()) + "-" + (new Date().getSeconds()) + '.png');
	}
	
	});
}