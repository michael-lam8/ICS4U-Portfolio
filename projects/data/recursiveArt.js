// Recursively draws shapes
var drawShape = function(x, y, radius) {
  // Divides radius by 2 on each recursive call
  var newRadius = radius/2;

  // Randomly selects colour on each recursive call
  fill(random(255), random(255), random(255));

  // Draws shape based on divisibility
  if (floor(newRadius) % 2 === 0) {
    ellipse(x, y, radius, radius);
  } else if (floor(newRadius) % 5 === 0) {
    rect(x, y, radius, radius);
  } else {
    triangle(x, y, x + random(20), y, x + random(20), y + random(20));
  }

  if (newRadius >= 2) {
    drawShape(x - 15, y - 15, radius - 20);
    drawShape(x, y, newRadius);
    drawShape(x, y, newRadius - 15);
  }
};

function setup() {
  createCanvas(400, 400);
  // Draws artwork
  drawShape(width/2, height/2, 600);
}
