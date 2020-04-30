import Tree from './Tree.js';


const windowWidth = 640;
const windowHeight = 960;

// P5 setup
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    let treePosition = createVector(width / 2, height);
    let tree = new Tree(treePosition);
    for (let i = 0; i < 80; i++) {
        tree.grow();
    }

    tree.draw();
}

function draw() {
}


// This is required by p5 when this script is loaded as a module
window.setup = setup;
window.draw = draw;