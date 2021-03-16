import p5 from "p5";

const container = document.getElementById("container");


let sketch = function(p) {


    let width = window.innerWidth;
    let height = window.innerHeight - 50;

    let x = 100;
    let y = 100;
    let xSpeed = 3;
    let ySpeed = 10;

    p.setup = function() {
        p.createCanvas(width, height);
        p.background(255);
    };

    p.draw = function() {
        p.background(255);

        x += xSpeed;
        y += ySpeed;

        if ((x > width) || (x < 0)) {
            xSpeed *= -1;
        }
        if ((y > height) || (y < 0)) {
            ySpeed *= -1;
        }

        p.stroke(0);
        p.fill(175);
        p.ellipse(x, y, 16, 16);
    }
}

let engine = new p5(sketch, container);

document.getElementById("reset").addEventListener("click", () => {
    engine.remove();
    engine = new p5(sketch, container);
});