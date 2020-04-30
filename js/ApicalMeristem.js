import { lerp, rand, randChoice } from './util.js';
import Internode from './Internode.js';


// Represents the terminal growing point of a branch
class ApicalMeristem {
    BRANCH_CHANCE = 0.25;
    FORK_CHANCE = 0.2;
    MIN_DIAMETER = 0.5;
    // Percentage of diameter retained each internode
    TAPER_RATIO = 0.94;
    // Amount of Perlin noise to add to angle every growth period
    MAX_ANGLE_NOISE = PI / 6;
    // Ratio to push branches upwards every growth period
    SHADE_INTOLERANCE = 0.1;

    // Minimum height, relative to root, where branches and forks can begin
    MINIMUM_BRANCH_HEIGHT = 100;
    // Mean angle of new branches, relative to the angle of this branch
    BRANCH_ANGLE_MEAN = PI / 3;
    // Standard deviation of new branch angle distribution
    BRANCH_ANGLE_SD = PI / 16;
    // Mean angle of new forked branches, relative to the angle of this branch
    FORK_ANGLE_MEAN = PI / 5;
    // Standard deviation of new fork angle distribution
    FORK_ANGLE_SD = PI / 16;
    BRANCH_AREA_RATIO = 0.25;
    // Proportion of area to retain when forking. Used to calculate fork diameter
    FORK_AREA_RATIO = 0.5;

    constructor(tree, diameter, position, angle = 0) {
        this.tree = tree;
        this.diameter = diameter;
        this.position = position;
        this.angle = angle;
        // Length of each internode between nodes
        this.internodeLength = this.diameter * 3;
        // An array of line internodes representing each growth 
        this.internodes = [];
    }

    // Keep growing internodes until diameter tapers to minimum
    grow = () => {
        if (this.diameter > this.MIN_DIAMETER) {
            let startDiameter = this.diameter;
            let endDiameter = this.diameter * this.TAPER_RATIO;
            let internodeStart = this.position;

            this.angle = this.updateAngle();

            let internodeDir = createVector(0, -this.internodeLength);
            internodeDir.rotate(this.angle);

            let internodeEnd = p5.Vector.add(internodeStart, internodeDir);

            let newInternode = new Internode(this.tree, startDiameter, endDiameter, internodeStart, internodeEnd);
            this.tree.internodes.push(newInternode);

            this.position = internodeEnd;
            this.diameter = endDiameter;
            this.internodeLength = this.diameter * 3;

            if (this.position.y < this.tree.position.y - this.MINIMUM_BRANCH_HEIGHT) {
                if (this.forked()) {
                    this.fork();
                }
                else if (this.branched()) {
                    this.branch();
                }
            }
        }
    }

    // Calculate the branch diameter that has a given proportion of the area of a given diameter
    getDiameter = (currentDiameter, areaProportion) => {
        let currentArea = PI * Math.pow(currentDiameter / 2, 2);
        let targetArea = currentArea * areaProportion;
        let targetDiameter = Math.sqrt(targetArea / PI) * 2;
        return targetDiameter;
    }

    // This meristem dies and is removed from the tree's active growing points
    die = () => {
        this.tree.removeApicalMeristem(this);
    }

    // A new apical meristem is created at this apical meristem, growing generally outwards
    branch = (angle = null, areaProportion = this.BRANCH_AREA_RATIO) => {
        if (angle === null) {
            let direction = randChoice([1, -1]);
            angle = this.angle + randomGaussian(this.BRANCH_ANGLE_MEAN, this.BRANCH_ANGLE_SD) * direction;
        }

        let branchDiameter = this.getDiameter(this.diameter, areaProportion);
        let newApicalMeristem = new ApicalMeristem(this.tree, branchDiameter, this.position, angle);
        this.tree.apicalMeristems.push(newApicalMeristem);
    }

    // This meristem dies and creates two new meristems splitting out
    fork = () => {
        let forkAngles = [
            this.angle + randomGaussian(this.FORK_ANGLE_MEAN, this.FORK_ANGLE_SD),
            this.angle + randomGaussian(this.FORK_ANGLE_MEAN, this.FORK_ANGLE_SD) * -1
        ];

        for (let i = 0; i < forkAngles.length; i++) {
            this.branch(forkAngles[i], this.FORK_AREA_RATIO);
        }
        this.die();
    }

    // Chance to create a new branch with a growing point off of this branch
    branched = () => {
        if (rand() < this.BRANCH_CHANCE) {
            return true;
        }
        return false;
    }

    // Chance to fork, creating two new segments with growing points and removing this growing point
    forked = () => {
        if (rand() < this.FORK_CHANCE) {
            return true;
        }
        return false;
    }

    // Adjust the angle of the leader by adding Perlin noise
    updateAngle = () => {
        let updatedAngle = this.angle;
        let angleNoise = noise(this.position.x, this.position.y);
        angleNoise = map(angleNoise, 0, 1, -this.MAX_ANGLE_NOISE, this.MAX_ANGLE_NOISE);
        updatedAngle += angleNoise;

        // Grow upwards
        let targetAngle = 0;
        updatedAngle = lerp(updatedAngle, targetAngle, this.SHADE_INTOLERANCE);

        return updatedAngle;
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

    // Check if this apical meristem is shaded by any branch on the tree
    isShaded = () => {
        if (this.tree.isShaded(this.position)) {
            return true;
        }
        return false;
    }
}


export default ApicalMeristem;