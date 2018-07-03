var robot = require("robotjs");
var fs = require("fs")
var robot = require("robotjs");
var Jimp = require("jimp");

var dt = new Date();

// import * as tf from '@tensorflow/tfjs';

// // Define a model for linear regression.
// const model = tf.sequential();
// model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// // Prepare the model for training: Specify the loss and the optimizer.
// model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// // Generate some synthetic data for training.
// const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
// const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// // Train the model using the data.
// model.fit(xs, ys, {epochs: 10}).then(() => {
//   // Use the model to do inference on a data point the model hasn't seen before:
//   model.predict(tf.tensor2d([5], [1, 1])).print();
// });

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

// Get mouse position.
// var mouse = robot.getMousePos();

// Get pixel color in hex format.
// var hex;
// hex = robot.getPixelColor(mouse.x, mouse.y);
// console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y);

// const { execFile } = require('child_process');

// const child = execFile('./Bizhawk/output/EmuHawk.exe', [''], (error, stdout, stderr) => {
// 	if (error) {
// 	  throw error;
// 	}
// 	console.log(stdout);
//   });

// const util = require('util');
// const execFile = util.promisify(require('child_process').execFile);

// async function getVersion() {
//   const { stdout } = await execFile('./Bizhawk/output/EmuHawk.exe', ['--load-rom']);

//   	var screen = robot.screen.capture(0,0,1920,1080);

//     var image = new Jimp(screen.width, screen.height, function(err, img) {
//     img.bitmap.data = screen.image;
//     img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
//       var red   = img.bitmap.data[ idx + 0 ];
//       var blue  = img.bitmap.data[ idx + 2 ];
//       img.bitmap.data[ idx + 0 ] = blue;
//       img.bitmap.data[ idx + 2 ] = red;
      
//     });
//     img.write("./images/" + fullDate + "/ right monitor " + (new Date().getHours()) + "-" + (new Date().getMinutes()) + "-" + (new Date().getSeconds()) + '.png');
// });
// console.log(stdout);
// }
// getVersion();

const fullDate = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + "/";
// for(var i = (dt.getSeconds()); i < (dt.getSeconds()+10); i++)
let promises = []
var i = 0;
var start = (new Date().getTime());
while(i % 1001 != 1000){
  var screen = robot.screen.capture(0,0,1920,1080);
	var image = new Jimp(screen.width, screen.height, function(err, img) {
	img.bitmap.data = screen.image;
	img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
		var red   = img.bitmap.data[ idx + 0 ];
		var blue  = img.bitmap.data[ idx + 2 ];
		img.bitmap.data[ idx + 0 ] = blue;
		img.bitmap.data[ idx + 2 ] = red;
		
  });
  i++;
  console.log(i);
	// if(i & 1){
    promises.push(new Promise((r, j) => {
      img.write("./images/" + fullDate + "/ right monitor " + new Date().getTime() + '.png');
    }));
  // }
	});
}
Promise.all(promises).then(() => {
  console.log("done")
});