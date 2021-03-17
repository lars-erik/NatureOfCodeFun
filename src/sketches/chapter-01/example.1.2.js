import { Vector } from "p5";

export default function(p) {
    let location = new Vector(100, 100);
    let velocity = new Vector(3, 10);

    p.setup = function() {
        p.background(255);
    };

    p.draw = function() {
        p.background(255);

        location.add(velocity);

        if ((location.x > p.width) || (location.x < 0)) {
            velocity.x *= -1;
        }
        if ((location.y > p.height) || (location.y < 0)) {
            velocity.y *= -1;
        }

        p.stroke(0);
        p.fill(175);
        p.ellipse(location.x, location.y, 50, 50);
    }
};