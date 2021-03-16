import p5 from "p5";

const container = document.getElementById("container");

let sketch = function(p) {
    let width = window.innerWidth;
    let height = window.innerHeight - 50;

    let location = new p5.Vector(100, 100);
    let velocity = new p5.Vector(3, 10);

    p.setup = function() {
        p.createCanvas(width, height);
        p.background(255);
    };

    p.draw = function() {
        p.background(255);

        location.add(velocity);

        if ((location.x > width) || (location.x < 0)) {
            velocity.x *= -1;
        }
        if ((location.y > height) || (location.y < 0)) {
            velocity.y *= -1;
        }

        p.stroke(0);
        p.fill(175);
        p.ellipse(location.x, location.y, 16, 16);
    }
}

let engine = new p5(sketch, container);

document.getElementById("reset").addEventListener("click", () => {
    engine.remove();
    engine = new p5(sketch, container);
});