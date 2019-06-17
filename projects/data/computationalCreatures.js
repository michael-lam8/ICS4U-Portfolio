// Enables on-demand global mode
new p5();

// Declaring variables
var accel = 0.005, negAccel = -0.005, boundary = 150;

// Draws pebbles at the bottom of screen
var drawPebbles = function() {
  for (var i = 9; i < width; i += 20) {
    stroke(0);
    fill(207, 207, 207);
    ellipse(i, 397, 18, 10);
  }
};

// Draws seaweed according to set values
var drawSeaweed = function(seaweedX, seaweedY, seaweedHeight) {
  noStroke();
  fill(40, 115, 0);
  rect(seaweedX, seaweedY, 15, seaweedHeight);
};

// Sets Fish object
var Fish = function(bodyColour, bodyLength, bodyHeight, tailWidth, tailHeight, tailColour, eyeSize) {
  this.bodyColour = bodyColour;
  this.bodyLength = bodyLength;
  this.bodyHeight = bodyHeight;
  this.tailWidth = tailWidth;
  this.tailHeight =  tailHeight;
  this.tailColour = tailColour;
  this.eyeSize = eyeSize;

  this.position = createVector(random(0, 400), random(0, 400));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(accel, accel);
};

// Draws fish according to set values
Fish.prototype.display = function() {
  fill(this.bodyColour); // Body
  ellipse(this.position.x, this.position.y, this.bodyLength, this.bodyHeight);
  fill(this.tailColour); // Tail
  triangle(this.position.x-this.bodyLength/2, this.position.y,
    this.position.x-this.bodyLength/2-this.tailWidth,
    this.position.y-this.tailHeight,
    this.position.x-this.bodyLength/2-this.tailWidth,
    this.position.y+this.tailHeight);
  fill(33); // Eyes
  ellipse(this.position.x+this.bodyLength/4, this.position.y, this.eyeSize,
    this.eyeSize);
};

// Moves fish within the canvas
Fish.prototype.move = function() {
  this.velocity.add(this.acceleration);
  this.velocity.limit(1);
  this.position.add(this.velocity);

  // Refrains fish from moving out of the canvas
  // and accelerates them in the opposing direction
  if (this.position.x < boundary && this.position.y < boundary) {
    this.acceleration.set(accel, accel);
  } else if (this.position.x < boundary && this.position.y > height - boundary) {
    this.acceleration.set(accel, negAccel);
  } else if (this.position.x > width - boundary && this.position.y < boundary) {
    this.acceleration.set(negAccel, accel);
  } else if (this.position.x > width - boundary &&
    this.position.y > height - boundary) {
    this.acceleration.set(negAccel, negAccel);
  }
};

// Declaring instances
var fish1 = new Fish(color(162, 0, 255), 60, 50, 10, 25, color(0, 120, 200), 5);
var fish2 = new Fish(color(255, 100, 100), -100, 50, -25, 25, color(162, 0, 255), 10);
var fish3 = new Fish(color(0, 120, 200), 75, 50, 20, 25, color(255, 100, 100), 8);

// Setting up program
function setup() {
  createCanvas(400, 400);
}

// Continuously animates code
function draw() {
  background(89, 216, 255);
  drawPebbles();
  drawSeaweed(50, 300, 100);
  drawSeaweed(67, 325, 75);

  fish1.display();
  fish1.move();

  drawSeaweed(325, 325, 75);
  drawSeaweed(343, 275, 125);

  fish2.display();
  fish3.display();
  fish2.move();
  fish3.move();
}
