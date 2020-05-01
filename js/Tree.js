import ApicalMeristem from "./ApicalMeristem.js";
import Leaf from "./Leaf.js";
import { randChoice, rand } from './util.js';


class Tree {
    // Percent of meristems that should have leaves
    LEAF_PERCENTAGE = 0.25;

    constructor(position) {
        this.internodes = [];
        this.leaves = [];
        this.apicalMeristems = [];
        this.position = position;

        let leader = new ApicalMeristem(this, 35, this.position);
        this.apicalMeristems.push(leader);
    }

    // Grow all active growing points
    grow = () => {
        for (let i = 0; i < this.apicalMeristems.length; i++) {
            this.apicalMeristems[i].grow();
        }
    }

    // Draw all the internodes that make up the tree
    draw = () => {
        this.leaves = this.generateLeaves();

        // Draw the leaves behind the branches
        this.drawLeaves(-1);
        this.drawInternodes();
        // Draw the leaves in front of the branches
        this.drawLeaves(1);
    }

    generateLeaves = () => {
        let leaves = [];
        for (let i = 0; i < this.apicalMeristems.length; i++) {
            if (rand() < this.LEAF_PERCENTAGE) {
                let leafPosition = createVector(this.apicalMeristems[i].position.x, this.apicalMeristems[i].position.y);
                let leafAngle = this.apicalMeristems[i].angle;
                let leaf = new Leaf(leafPosition, leafAngle, randChoice([-1, 1]));
                leaves.push(leaf);
            }
        }
        return leaves;
    }

    drawInternodes = () => {
        for (let i = 0; i < this.internodes.length; i++) {
            this.internodes[i].draw();
        }
    }

    drawLeaves = (depth) => {
        for (let i = 0; i < this.leaves.length; i++) {
            if (this.leaves[i].depth === depth) {
                this.leaves[i].draw();
            }
        }
    }

    // Remove a single meristem object from the active meristems
    removeApicalMeristem = (apicalMeristem) => {
        let removeIndex = this.apicalMeristems.indexOf(apicalMeristem);
        this.apicalMeristems.splice(removeIndex, 1);
    }

    // Check each internode to see if it is shading a given position
    isShaded = (position) => {
        for (let i = 0; i < this.internodes.length; i++) {
            if (this.internodes[i].isShading(position)) {
                return true;
            }
        }
        return false;
    }
}

export default Tree;