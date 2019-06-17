// Enables on-demand global mode
new p5();

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

  this.position = createVector(random(50, 350), random(50, 250));
  this.velocity = createVector(0, 0);

  this.initialAngle = 0;
  this.amplitude = 0.2;
  this.period = 300;
};

// Moves fish in an oscillation motion
Fish.prototype.move = function() {
  var a = this.amplitude * sin(this.initialAngle);
  this.velocity.set(createVector(0, a));
  this.position.add(this.velocity);
  this.initialAngle += TWO_PI / this.period;
};

// Draws fish according to set values
Fish.prototype.display = function() {
  fill(this.bodyColour); // Body
  ellipse(this.position.x, this.position.y,
    this.bodyLength, this.bodyHeight);
  fill(this.tailColour); // Tail
  triangle(this.position.x - this.bodyLength/2,
    this.position.y,
    this.position.x - this.bodyLength/2 -
    this.tailWidth,
    this.position.y - this.tailHeight,
    this.position.x - this.bodyLength/2 -
    this.tailWidth,
    this.position.y + this.tailHeight);
  fill(33); // Eyes
  ellipse(this.position.x + this.bodyLength/4,
    this.position.y, this.eyeSize,
    this.eyeSize);
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

  fish1.move();
  fish1.display();

  drawSeaweed(325, 325, 75);
  drawSeaweed(343, 275, 125);

  fish2.move();
  fish2.display();

  fish3.move();
  fish3.display();
}
