// Updated June 16, 2019
// Changes: - Modified code to work with p5.js library
//          - Enabled mouse press (tap on mobile) as jump control

// Declaring variables
var beaver, sticks = [], grassXs = [], levelState = 0, stickSpeed = 1.5, happyHopper, jumpingHopper, grassBlock;
var textX = 20; // To solve bug that shifts text  on level 2 in p5.js (bug not present in Khan Academy)

var Beaver = function(x, y) {
  this.x = x;
  this.y = y;
  this.img = happyHopper;
  this.sticks = 0;
};

Beaver.prototype.draw = function() {
  fill(255, 0, 0);
  this.y = constrain(this.y, 0, height-88);
  image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
  this.img = jumpingHopper;
  this.y -= 5;
};

Beaver.prototype.fall = function() {
  this.img = happyHopper;
  this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
  if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
    (stick.y >= this.y && stick.y <= (this.y + 40))) {
    stick.y = -400;
    this.sticks++;
  }
};

var Stick = function(x, y) {
  this.x = x;
  this.y = y;
};

Stick.prototype.draw = function() {
  fill(89, 71, 0);
  rectMode(CENTER);
  rect(this.x, this.y, 5, 40);
};

function preload() {
  happyHopper = loadImage("https://www.kasandbox.org/third_party/javascript-khansrc/live-editor/build/images/creatures/Hopper-Happy.png");
  jumpingHopper = loadImage("https://www.kasandbox.org/third_party/javascript-khansrc/live-editor/build/images/creatures/Hopper-Jumping.png");
  grassBlock = loadImage("https://www.kasandbox.org/third_party/javascript-khansrc/live-editor/build/images/cute/GrassBlock.png");
}

function setup() {
  createCanvas(400, 400);

  beaver = new Beaver(200, 300);

  for (let i = 0; i < 40; i++) {
    sticks.push(new Stick(i * 40 + 300, random(20, 260)));
  }

  for (let i = 0; i < 25; i++) {
    grassXs.push(i*20);
  }
}

var gameFunction = function () {
  background(227, 254, 255);
  fill(130, 79, 43);
  rectMode(CORNER);
  textAlign(CORNER, CORNER);
  rect(0, height*0.90, width, height*0.10);

  for (let i = 0; i < grassXs.length; i++) {
    image(grassBlock, grassXs[i], height*0.85, 20, 20);
    grassXs[i] -= 1;
    if (grassXs[i] <= -20) {
      grassXs[i] = width;
    }
  }

  for (let i = 0; i < sticks.length; i++) {
    sticks[i].draw();
    beaver.checkForStickGrab(sticks[i]);
    sticks[i].x -= stickSpeed;
  }

  textSize(18);
  text("Score: " + beaver.sticks, textX, 30);

  if (keyIsPressed && keyCode === 32 || mouseIsPressed) {
    beaver.hop();
  } else {
    beaver.fall();
  }
  beaver.draw();
};

var resetGame = function() {
  beaver.sticks = 0;
  sticks = [];
  for (let i = 0; i < 40; i++) {
    sticks.push(new Stick(i * 40 + 300, random(20, 260)));
  }
};

var levelOne = function() {
  gameFunction();
  if (beaver.sticks >= 30 && sticks[39].x < 0) {
    background(227, 254, 255);
    fill(0);
    textAlign(CENTER, CENTER);
    text("level one cleared yay", width/2, height/2-15);
    text("press shift or click to continue", width/2, height/2+15);
    if (keyIsPressed && keyCode === SHIFT || mouseIsPressed) {
      stickSpeed += 2;
      levelState += 1;
      textX += 30;
      resetGame();
    }
  } else if (beaver.sticks < 30 && sticks[39].x < 0) {
    background(227, 254, 255);
    fill(0);
    textAlign(CENTER, CENTER);
    text("you lose :(", width/2, height/2-15);
    text("press shift to try again", width/2, height/2+15);
    if (keyIsPressed && keyCode === SHIFT || mouseIsPressed) {
      levelState = 0;
      resetGame();
    }
  }
};

var levelTwo = function() {
  gameFunction();
  if (beaver.sticks >= 35 && sticks[39].x < 0) {
    background(227, 254, 255);
    fill(0);
    textAlign(CENTER, CENTER);
    text("you win yay fantastic", width/2, height/2-15);
    text("press shift to restart", width/2, height/2+15);
    if (keyIsPressed && keyCode === SHIFT || mouseIsPressed) {
      levelState = 0;
      resetGame();
    }
  } else if (beaver.sticks < 35 && sticks[39].x < 0) {
    background(227, 254, 255);
    fill(0);
    textAlign(CENTER, CENTER);
    text("you lose :(", width/2, height/2-15);
    text("press shift to try again", width/2, height/2+15);
    if (keyIsPressed && keyCode === SHIFT || mouseIsPressed) {
      levelState = 1;
      resetGame();
    }
  }
};

function draw() {
  if (levelState === 0) {
    levelOne();
  } else if (levelState >= 1) {
    levelTwo();
  }
}
