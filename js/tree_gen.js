const windowWidth = 600;
const windowHeight = 650;

// Set starting seed to a constant value to generate repeatable results
const STARTING_SEED = 1;
let seed = STARTING_SEED;

let slider;
let generateButton;
let angle;

// Max variability in length for any given branch
const LENGTH_VARIABILITY = 0.33;
// Default change in branch length per level of depth
const LENGTH_MULTIPLIER = 0.7;
const ANGLE_VARIABILITY = Math.PI / 4;
const MIN_BRANCHES = 1;
const MAX_BRANCHES = 2;

// P5 setup
function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
  generateButton = createButton('Generate New');

  generateButton.mousePressed(generate);
  slider.changed(generate);

  background(50);

  generate();
}

function draw() {
}

// Generate a new recursive tree
const generate = () => {
  translate(width / 2, height / 1.2);
  stroke(255);
  angle = slider.value();
  background(50);
  branch(160, 1, 12);
}

// Recursively generate a branch and its subbranches
const branch = (len, depth = 1, maxDepth = 12) => {
  // Calculate the default length for this depth of branch
  let defaultLen = Math.pow(LENGTH_MULTIPLIER, depth) * len;
  // Calculate the length of this specific branch within a random window of the default length
  let branchLen = randRange(defaultLen - defaultLen * LENGTH_VARIABILITY, defaultLen + defaultLen * LENGTH_VARIABILITY);

  // Set stroke weight to decrease with depth
  strokeWeight(6 / depth);
  // Draw this branch
  line(0, 0, 0, -branchLen);
  // Translate to end of branch
  translate(0, -branchLen);

  if (depth < maxDepth) {
    let branches = int(randRange(MIN_BRANCHES, MAX_BRANCHES + 1));
    // Calculate default angle between each branch
    let angleDelta = angle / (branches - 1);
    // Randomize the angle of each branch
    let branchAngle = angle + randRange(-angle * ANGLE_VARIABILITY, angle * ANGLE_VARIABILITY);
    //branchAngle = angle;

    // Draw all sub-branches
    for (let i = 0; i < branches; i++) {
      push();
      rotate(-branchAngle / 2 + angleDelta * i);
      branch(len, depth + 1);
      pop();
    }
  }
}

// Generate a random number within a range
const randRange = (min, max) => {
  return rand() * (max - min) + min;
}

// Generate a random number using a seed
const rand = () => {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Reset the random seed
const resetSeed = () => {
  seed = STARTING_SEED;
}