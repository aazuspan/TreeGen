import { isIntersecting } from './util.js';


// A single, straight segment of a branch
class Internode {
    constructor(tree, startDiameter, endDiameter, startPosition, endPosition) {
        this.tree = tree;
        this.startDiameter = startDiameter;
        this.endDiameter = endDiameter;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
    }

    // Draw the segment
    draw = () => {
        stroke(255);
        strokeWeight(this.startDiameter);
        line(this.startPosition.x, this.startPosition.y, this.endPosition.x, this.endPosition.y);
    }

    // Check if a given coordinate is underneath this segment
    isShading = (position, sunAngle = 0) => {
        // Cast a ray directly towards the sun
        let rayDir = createVector(0, -9999);
        rayDir.rotate(sunAngle);

        let rayStartPosition = position;
        let rayEndPosition = p5.Vector.add(rayStartPosition, rayDir);

        // If the ray intersects with this segment, the position is shaded
        if (isIntersecting(this.startPosition, this.endPosition, rayStartPosition, rayEndPosition)) {
            return true;
        }
        return false;
    }
}

export default Internode;