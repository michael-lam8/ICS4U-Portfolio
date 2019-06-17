// Enables on-demand global mode
new p5();

// Declaring variables
var standardDev = 50, mean = width/2;

// Setting up program
function setup() {
  createCanvas(400, 400);
}

// Randomly drawing dots with normal distribution
function draw() {
  var a = randomGaussian();
  var b = randomGaussian(mean + 50, standardDev);
  var pointX = a * standardDev + mean;
  var fill = b * standardDev + mean;

  stroke(0, fill, fill, 25);
  strokeWeight(8);
  point(pointX + width/2, height/2);
};
