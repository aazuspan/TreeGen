import ApicalMeristem from "./ApicalMeristem.js";
import Leaf from "./Leaf.js";


class Tree {
    constructor(position) {
        this.internodes = [];
        this.leaves = [];
        this.apicalMeristems = [];
        this.position = position;

        let leader = new ApicalMeristem(this, 25, this.position);
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
        for (let i = 0; i < this.internodes.length; i++) {
            this.internodes[i].draw();
        }

        this.drawLeaves();
    }

    drawLeaves = () => {
        for (let i = 0; i < this.apicalMeristems.length; i++) {
            let leafPosition = createVector(this.apicalMeristems[i].position.x, this.apicalMeristems[i].position.y);
            let leafAngle = this.apicalMeristems[i].angle;
            let leaf = new Leaf(leafPosition, leafAngle);
            leaf.draw();
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