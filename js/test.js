import ApicalMeristem from './ApicalMeristem.js';


const windowWidth = 600;
const windowHeight = 650;

// P5 setup
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(50);
    let leader = new ApicalMeristem(null, 16, createVector(width / 2, height));
    leader.grow();
    leader.draw();
}

function draw() {
}


// This is required by p5 when this script is loaded as a module
window.setup = setup;
window.draw = draw;