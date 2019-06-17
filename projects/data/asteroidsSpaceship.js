// Enables on-demand global mode
new p5();

// Creating Spaceship object
var Spaceship = function() {
  this.position = createVector(width/2, height/2);
  this.velocity = createVector(0.4, 0);
  this.acceleration = createVector(0, 0);
  this.topspeed = 5;
};

// Updates spaceship properties
Spaceship.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.topspeed);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
};

// Applies force to spaceship
Spaceship.prototype.applyForce = function(force) {
  this.acceleration.add(force);
};

// Turns spaceship left when left arrow key is pressed
Spaceship.prototype.turnLeft = function() {
  var angle = this.velocity.copy();
  angle.rotate(-0.15);
  this.applyForce(angle);
};

// Turns spaceship right when right arrow key is pressed
Spaceship.prototype.turnRight = function() {
  var angle = this.velocity.copy();
  angle.rotate(0.15);
  this.applyForce(angle);
};

// Draws spaceship
Spaceship.prototype.display = function () {
  var angle = this.velocity.heading();

  push();
  translate(this.position.x, this.position.y);
  rotate(angle + 1.6);
  fill(175);
  rect(6, 96, 10, 10);
  rect(36, 96, 10, 10);
  fill(230);
  triangle(0, 100, 25, 50, 50, 100);
  pop();
};

// Wraps spaceship around canvas when it reaches edge
Spaceship.prototype.checkEdges = function () {
  if (this.position.x > width + 100) {
    this.position.x = -50;
  } else if (this.position.x < -100) {
    this.position.x = width + 50;
  }

  if (this.position.y > height + 100) {
    this.position.y = -50;
  } else if (this.position.y < -100) {
    this.position.y = height + 50;
  }
};

// Declaring instances
var ship;

// Setting up program
function setup() {
  createCanvas(400, 400);
  ship = new Spaceship();
}

// Continuously animates code
function draw() {
  background(28);
  ship.update();
  ship.checkEdges();
  ship.display();
}

// Turns ship based on arrow keys, and accelerates ship when Z is pressed
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    ship.turnLeft();
  } else if (keyCode === RIGHT_ARROW) {
    ship.turnRight();
  } else if (keyCode === 90) {
    var accel = createVector(0.15);
    ship.applyForce(accel);
  }
}
