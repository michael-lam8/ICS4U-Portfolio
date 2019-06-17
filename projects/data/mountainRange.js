// Enables on-demand global mode
new p5();

// Draws cloud background overlay using noise
var drawClouds = function() {
  var xOff = 0.0;
  for (var x = 0; x < width; x++) {
    var yOff = 0.0;
    for (var y = 0; y < height; y++) {
      var bright = map(noise(xOff, yOff), 0, 1, 100, 255);
      stroke(bright, bright, bright, 125);
      point(x, y);
      yOff += 0.01;
    }
    xOff += 0.01;
  }
};

// Draws background mountain range using noise
var drawBackRange = function() {
  var incAmount = 0.01;
  for (var t = 0; t < incAmount*width; t += incAmount) {
    var n = noise(t, 75);
    var y = map(n, 0, 1, 0, height/2);
    stroke(25);
    rect(t*100, height-y*1.5, 1, height);
  }
};

// Draws front mountain range using noise
var drawRange = function() {
  var incAmount = 0.01;
  for (var t = 0; t < incAmount*width; t += incAmount) {
    var n = noise(t);
    var y = map(n, 0, 1, 0, height/2);
    stroke(0);
    rect(t*100, height-y, 1, y);
  }
};

// Draws trees (points) using randomness
var drawTrees = function() {
  for (var i = 0; i < 20; i++) {
    var a = randomGaussian();
    var b = randomGaussian();
    var pointX = a * 250;
    var pointY = b * 10 + 375;
    stroke(6, 92, 29);
    strokeWeight(4);
    point(pointX, pointY);
  }
};

// Setting up program
function setup() {
  createCanvas(400, 400);
  background(107, 216, 255);

  drawClouds();
  drawBackRange();
  drawRange();
  drawTrees();
}
