import ApicalMeristem from "./ApicalMeristem.js";


class Tree {
    constructor(position) {
        this.internodes = [];
        this.apicalMeristems = [];
        this.position = position;

        let leader = new ApicalMeristem(this, 32, this.position);
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
    }

    // Remove a single meristem object from the active meristems
    removeApicalMeristem = (apicalMeristem) => {
        let removeIndex = this.apicalMeristems.indexOf(apicalMeristem);
        this.apicalMeristems.splice(removeIndex, 1);
    }

    // Remove all branches within a certain distance of the ground
    prune = () => {

    }
}

export default Tree;