import { Vector } from "p5";
import defaultSetup from "../defaultsetup";

export default function(p) {
    p.setup = function() {
        defaultSetup(p);
        p.createCanvas(p.width, p.height);
        p.background(255);
    };

    p.draw = function() {
        p.background(255);

        let mouse = new Vector(p.mouseX, p.mouseY);
        let center = new Vector(p.width / 2, p.height / 2);

        mouse.sub(center);

        mouse.normalize();
        mouse.mult(p.height / 2.2);
        p.translate(p.width / 2, p.height / 2);
        p.strokeWeight(3);
        p.line(0, 0, mouse.x, mouse.y);
    }
};