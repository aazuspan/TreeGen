import { randRange } from "./util.js";

class Leaf {
    LEAF_SIZE_MEAN = 8;
    LEAF_SIZE_SD = 2;

    constructor(position, angle, depth) {
        this.depth = depth;
        this.position = position;
        this.angle = angle;
        this.size = randomGaussian(this.LEAF_SIZE_MEAN, this.LEAF_SIZE_SD);
        this.red = randRange(0, 100);
        this.green = randRange(100, 150);
        this.blue = randRange(25, 50);
        this.alpha = 200;
        this.color = [this.red, this.green, this.blue, this.alpha];
    }

    draw = () => {
        noStroke();
        fill(this.color);
        rectMode(CENTER);

        push();
        translate(this.position.x, this.position.y)
        rotate(this.angle);
        square(0, 0, this.size);
        pop();
    }
}

export default Leaf;