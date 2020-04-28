class Leader {
    BRANCH_CHANCE = 0.3;
    FORK_CHANCE = 0.05;
    MIN_DIAMETER = 0.1;
    // Percentage of diameter retained each segment
    TAPER_RATIO = 0.9;
    MAX_ANGLE_NOISE = PI / 16;

    constructor(tree, diameter, position) {
        this.tree = tree;
        this.diameter = diameter;
        this.position = position;
        this.angle = 0;
        // Length of each segment between nodes
        this.segmentLength = this.diameter * 3;
        // An array of line segments representing each growth 
        this.segments = [];
        // An array of node locations representing epicormic branches
        this.nodes = [];
    }

    // Keep growing segments until diameter tapers to minimum
    grow = () => {
        while (this.diameter > this.MIN_DIAMETER) {
            let startDiameter = this.diameter;
            let endDiameter = this.diameter * this.TAPER_RATIO;
            let segmentStart = this.position;

            this.updateAngle();

            let segmentDir = createVector(0, -this.segmentLength);
            segmentDir.rotate(this.angle);

            let segmentEnd = p5.Vector.add(segmentStart, segmentDir);

            let newSegment = new Segment(this.tree, startDiameter, endDiameter, segmentStart, segmentEnd);
            this.segments.push(newSegment);

            this.position = segmentEnd;
            this.diameter = endDiameter;
            this.segmentLength = this.diameter * 3;
        }
    }

    // Adjust the angle of the leader by adding Perlin noise
    updateAngle = () => {
        let angleNoise = noise(this.position.x, this.position.y);
        angleNoise = map(angleNoise, 0, 1, -this.MAX_ANGLE_NOISE, this.MAX_ANGLE_NOISE);
        this.angle += angleNoise;
    }

    // Draw all segments of this leader
    draw = () => {
        for (let i = 0; i < this.segments.length; i++) {
            this.segments[i].draw();
        }
    }
}


class Segment {
    constructor(tree, startDiameter, endDiameter, startPosition, endPosition) {
        this.tree = tree;
        this.startDiameter = startDiameter;
        this.endDiameter = endDiameter;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }

    draw = () => {
        stroke(255);
        strokeWeight(this.startDiameter);
        line(this.startPosition.x, this.startPosition.y, this.endPosition.x, this.endPosition.y);
    }
}

export default Leader;