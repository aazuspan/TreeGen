import Internode from './Internode.js';


// Represents the terminal growing point of a branch
class ApicalMeristem {
    BRANCH_CHANCE = 0.3;
    FORK_CHANCE = 0.05;
    MIN_DIAMETER = 0.1;
    // Percentage of diameter retained each internode
    TAPER_RATIO = 0.92;
    MAX_ANGLE_NOISE = PI / 16;

    constructor(tree, diameter, position) {
        this.tree = tree;
        this.diameter = diameter;
        this.position = position;
        this.angle = 0;
        // Length of each internode between nodes
        this.internodeLength = this.diameter * 3;
        // An array of line internodes representing each growth 
        this.internodes = [];
        // An array of node locations representing epicormic branches
        this.nodes = [];
    }

    // TODO: Keep a list of growing points for the tree. Any time a new branch or fork is created, it is added as a growing point. When it dies or tapers to nothing, it is removed. Every round of growth, all of the growing points grow a certain amount, probably based on their current length.
    // TODO: In order to accurately simulate growth, diameter should start small. As sub-branches are added, all upstream branches should increase a small amount in diameter
    // Keep growing internodes until diameter tapers to minimum
    grow = () => {
        while (this.diameter > this.MIN_DIAMETER) {
            let startDiameter = this.diameter;
            let endDiameter = this.diameter * this.TAPER_RATIO;
            let internodeStart = this.position;

            this.updateAngle();

            let internodeDir = createVector(0, -this.internodeLength);
            internodeDir.rotate(this.angle);

            let internodeEnd = p5.Vector.add(internodeStart, internodeDir);

            let newInternode = new Internode(this.tree, startDiameter, endDiameter, internodeStart, internodeEnd);
            this.internodes.push(newInternode);

            this.position = internodeEnd;
            this.diameter = endDiameter;
            this.internodeLength = this.diameter * 3;
        }
    }

    // Adjust the angle of the leader by adding Perlin noise
    updateAngle = () => {
        let angleNoise = noise(this.position.x, this.position.y);
        angleNoise = map(angleNoise, 0, 1, -this.MAX_ANGLE_NOISE, this.MAX_ANGLE_NOISE);
        this.angle += angleNoise;
    }

    // Draw all internodes of this leader
    draw = () => {
        for (let i = 0; i < this.internodes.length; i++) {
            this.internodes[i].draw();
        }
    }

    // Check if any internodes are shading a given position
    isShading = (position) => {
        for (let i = 0; i < this.internodes.length; i++) {
            if (this.internodes[i].isShading(position)) {
                return true;
            }
        }
        return false;
    }
}


export default ApicalMeristem;