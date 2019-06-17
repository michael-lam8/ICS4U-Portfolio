// Declaring variables
var colour, ySpeed;
var xPositions = [], yPositions = [], dropColour = [], rainSpeed = [];

function setup() {
  // Declares canvas size
  createCanvas(400, 400);

  // Initializes random x coordinates for raindrops
  for (let i = 0; i < 4; i++) {
    let j = random(400);
    xPositions.push(j);
    yPositions.push(0);
  }

  // Initializes random colours and falling speed for raindrops
  for (let i = 0; i < xPositions.length; i++) {
    colour = color(random(255), random(255), random(255));
    dropColour.push(colour);
    ySpeed = random(5, 10);
    rainSpeed.push(ySpeed);
  }
}

function draw() {
  background(204, 247, 255);
  // Draws and animates rain falling down screen
  for (let i = 0; i < xPositions.length; i++) {
    noStroke();
    fill(dropColour[i]);
    ellipse(xPositions[i], yPositions[i], 10, 10);
    yPositions[i] += rainSpeed[i];
    // Resets y coordinate when raindrops reach bottom of screen
    if (yPositions[i] >= height) {
      yPositions[i] = 0;
    }
  }
}

// Adds raindrops based on mouseX coordinates
function mouseClicked() {
  xPositions.push(mouseX);
  yPositions.push(0);
  colour = color(random(255), random(255), random(255));
  dropColour.push(colour);
  ySpeed = random(5, 10);
  rainSpeed.push(ySpeed);
};
