import { Vector } from "p5";

export default function(p) {
    let width = window.innerWidth;
    let height = window.innerHeight - 50;

    p.setup = function() {
        p.createCanvas(width, height);
        p.background(255);
    };

    p.draw = function() {
        p.background(255);

        let mouse = new Vector(p.mouseX, p.mouseY);
        let center = new Vector(width / 2, height / 2);

        mouse.sub(center);

        p.translate(width / 2, height / 2);
        p.strokeWeight(3);
        p.line(0, 0, mouse.x, mouse.y);
    }
};