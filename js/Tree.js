class Tree {
    constructor() {
        this.branches = [];
        this.growingPoints = [];
    }

    // Grow all active growing points
    grow = () => {
        for (let i = 0; i < this.growingPoints.length; i++) {
            this.growingPoints[i].grow();
        }
    }
}