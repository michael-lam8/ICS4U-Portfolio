function preload() {
  grassBlock = loadImage("https://www.kasandbox.org/third_party/javascript-khansrc/live-editor/build/images/cute/GrassBlock.png");
  brownBlock = loadImage("https://www.kasandbox.org/third_party/javascript-khansrc/live-editor/build/images/cute/BrownBlock.png");
  tallTree = loadImage("https://www.kasandbox.org/third_party/javascript-khansrc/live-editor/build/images/cute/TreeTall.png");
}

function setup() {
  // Declares canvas size
  createCanvas(400, 400);
  background(219, 255, 255);

  // Grass
  for (let x = 0; x < width; x += 47) {
    image(grassBlock, x, height-80, 47, 80);
  }

  // Roof
  fill(174, 180, 214);
  triangle(200, 28, 350, 150, 50, 150);

  // House
  rect(60, 149, 281, 208);
  for (let i = 61; i < 340; i += 40) {
    for (let j = 130; j < 300; j += 40) {
      image(brownBlock, i, j, 40, 68);
    }
  }

  // Door
  fill(120, 80, 19);
  rect(180, 280, 40, 77);
  fill(0);
  ellipse(210, 320, 5, 5);

  // Windows
  fill(158, 250, 255);
  for (let i = 80; i <= 120; i += 40) {
    for (let j = 180; j <= 220; j += 40) {
      rect(i, j, 40, 40);
      rect(i+160, j, 40, 40);
    }
  }

  // Tree
  image(tallTree, 15, 215, 101, 171);
}
