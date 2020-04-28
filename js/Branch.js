class Branch {
    constructor(begin, end, depth = 1) {
        this.begin = begin;
        this.end = end;
        this.depth = depth;
        this.children = [];
    }

    draw = () => {
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    // Create sub-branches for this branch. Return an array of sub-branches.
    branch = () => {
        let branchAngles = [-PI / 8, PI / 8];

        for (let i = 0; i < branchAngles.length; i++) {
            let subBranch = this.createBranch(branchAngles[i]);
            this.children.push(subBranch);
        }

        return this.children;
    }


    // Create a new branch from the end of this branch at a specified angle
    createBranch = (angle) => {
        let subBranchDir = p5.Vector.sub(this.end, this.begin);
        subBranchDir.rotate(angle);
        subBranchDir.mult(0.66)
        let subBranchEnd = p5.Vector.add(this.end, subBranchDir);
        let subBranch = new Branch(this.end, subBranchEnd, this.depth + 1);
        return subBranch;
    }
}

export default Branch;