import { Vector } from "p5";

export default function(p) {
    p.setup = function() {
        p.background(255);
    };

    p.draw = function() {
        p.background(255);

        let mouse = new Vector(p.mouseX, p.mouseY);
        let center = new Vector(p.width / 2, p.height / 2);

        mouse.sub(center);

        let m = mouse.mag();
        p.fill(0);
        p.rect(0, 0, m, 10);

        p.translate(p.width / 2, p.height / 2);
        p.strokeWeight(3);
        p.line(0, 0, mouse.x, mouse.y);
    }
};