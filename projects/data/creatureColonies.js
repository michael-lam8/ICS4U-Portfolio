// Enables on-demand global mode
new p5();

// Declaring variables
var accel = random(0.001, 0.005), negAccel = random(-0.001, -0.005), boundary = 150;
var blueHue = 198, time = 0, counterRunning, fish = [], fishBorn = false;

// Continuously changes background hue to simulate time
var drawBackground = function() {
  colorMode(HSB);
  background(blueHue, 255, 255);
  if (counterRunning) {
    blueHue += 0.01;
  } else {
    blueHue -= 0.01;
  }

  if (blueHue >= 255) {
    counterRunning = false;
  } else if (blueHue <= 198) {
    counterRunning = true;
    time++;
  }
};

// Draws pebbles at the bottom of screen
var drawPebbles = function() {
  for (let i = 9; i < width; i += 20) {
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

// Moves fish towards food (mouse) when mouse is pressed
Fish.prototype.followFood = function() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 &&
    mouseY < height && mouseIsPressed) {
    var mouse = createVector(mouseX, mouseY);
    var dir = p5.Vector.sub(mouse, this.position);
    dir.normalize();
    this.acceleration.set(dir);
  }
};

// Moves fish within the canvas
Fish.prototype.move = function() {
  this.velocity.add(this.acceleration);
  this.velocity.limit(0.85);
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

// Removes all but 2 instances of fish every 15 years
Fish.prototype.checkLife = function() {
  if (time % 15 === 0 && time !== 0) {
    for (let i = fish.length - 3; i >= 0; i--) {
      fish.splice(i, 1);
    }
  }
};

// Sets eel object
// The tail variables are required to be called in order to use
// eyeSize in later methods - they are thus set to 0 when declared
var Eel = function(bodyColour, bodyLength, bodyHeight, tailWidth,
  tailHeight, tailColour, eyeSize) {
  Fish.call(this, bodyColour, bodyLength, bodyHeight, tailWidth,
    tailHeight, tailColour, eyeSize);
};

// Inheriting methods from Fish
Eel.prototype = Object.create(Fish.prototype);

// Draws eel according to set values
Eel.prototype.display = function() {
  fill(this.bodyColour); // Body
  ellipse(this.position.x, this.position.y, this.bodyLength, this.bodyHeight);
  fill(255);
  ellipse(this.position.x - 60, this.position.y - 2, this.eyeSize, this.eyeSize);
};

// Declaring instances
fish.push(new Fish(color(162, 0, 255), 60, 50, 10, 25, color(0, 120, 200), 5));
fish.push(new Fish(color(255, 100, 100), -100, 50, -25, 25, color(162, 0, 255), 10));
fish.push(new Fish(color(0, 120, 200), 75, 50, 20, 25, color(255, 100, 100), 8));
fish.push(new Eel(22, 160, 20, 0, 0, 0, 4));

// Setting up program
function setup() {
  createCanvas(400, 400);
}

// Continuously animates code
function draw() {
  drawBackground();
  colorMode(RGB);

  drawPebbles();
  drawSeaweed(50, 300, 100);
  drawSeaweed(67, 325, 75);

  for (let i = 0; i < fish.length; i++) {
    fish[i].followFood();
    fish[i].move();
    fish[i].display();
    fish[i].checkLife();
  }

  drawSeaweed(325, 325, 75);
  drawSeaweed(343, 275, 125);

  // Creates new fish instance every 10 years
  if (time % 10 === 0 && time !== 0 && !fishBorn) {
    for (let i = 0; i < 2; i++) {
      fish.push(new Fish(color(random(255), random(255), random(255)),
        random(10, 100), random(10, 80), random(10, 50),
        random(10, 40),
        color(random(255), random(255), random(255)),
        random(2, 6)));
    }
    fishBorn = true;
  } else if (time % 10 !== 0) {
    fishBorn = false;
  }

  // Draws food when mouse is pressed
  if (mouseIsPressed) {
    fill(255, 175, 56);
    ellipse(mouseX, mouseY, 10, 10);
  }

  // Displays year
  fill(255);
  textSize(16);
  text("Year " + time, 4, 16);
}
