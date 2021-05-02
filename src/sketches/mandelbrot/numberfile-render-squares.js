import { Vector } from "p5";

export default function (p) {
    const pointRadius = 15;

    let location = new Vector(0, 0);
    let velocity = new Vector(3, 10);
    let translation = new Vector(0, 0, 1);
    let dragging = false;
    let ctx;
    let iters = 1;

    p.setup = function (c) {
        ctx = c;
        p.background(255);

        p.keyPressed = () => {
            if (p.key == '+') iters++;
            if (p.key == '-') iters = Math.max(1, iters-1);
        }
    };

    p.draw = function () {
        translation.x = p.width / 2;
        translation.y = p.height / 2;
        let mouse = new Vector(p.mouseX, p.mouseY).sub(translation);

        const toScreen = (v) => {
            return v
                .copy()
                .mult(1, -1)
                .div(2)
                .add([.5 * p.width / p.height, .5])
                .mult([p.height, p.height])
                .sub(translation);
        };

        if (p.mouseIsPressed && p.dist(location.x, location.y, mouse.x, mouse.y) < pointRadius) {
            dragging = true;
        }
        else if (!p.mouseIsPressed) {
            dragging = false;
        }
        if (dragging) {
            location = mouse;
        }

        p.background(255);
        p.translate(translation.x, translation.y);

        p.strokeWeight(3);
        p.stroke(150);
        ctx.drawingContext.setLineDash([10, 15]);

        let lw = Math.ceil(p.width / 100) * 100;
        let lh = Math.ceil(p.height / 100) * 100

        p.line(lw / -2 - 5, 0, lw / 2, 0)
        p.line(0, lh / -2 - 5, 0, lh / 2);

        let unitScr = toScreen(new Vector(2, 2));
        p.fill(0, 0, 0, 0);
        p.ellipse(0, 0, unitScr.x, unitScr.y);
       
        ctx.drawingContext.setLineDash([1, 0]);
        p.strokeWeight(2);
        p.stroke(60);
        p.fill(175);
        p.ellipse(location.x, location.y, pointRadius, pointRadius);

        let fracLoc = location.copy()
        .add(translation)
        .div([p.height, p.height])
        .sub([.5 * p.width / p.height, .5])
        .mult(2)
        .mult(1, -1);

        let prev = fracLoc;

        for (let i = 0; i < iters; i++) {
            let square = new Vector(
                prev.x ** 2 - prev.y ** 2,
                prev.x * prev.y * 2
            );
            let squarePos = toScreen(square);
            let prevPos = toScreen(prev);

            p.stroke(60);
            p.strokeWeight(1);
            p.line(prevPos.x, prevPos.y, squarePos.x, squarePos.y);

            p.strokeWeight(2);
            p.fill(190);
            p.ellipse(squarePos.x, squarePos.y, pointRadius - 5, pointRadius - 5);

            prev = square;
        }


        const displayX = Math.round(fracLoc.x * 100) / 100;
        const displayY = Math.round(fracLoc.y * 100) / 100;

        p.stroke(0);
        p.strokeWeight(0);
        p.fill(0);
        p.textAlign(p.RIGHT);
        p.text(displayX + "x" + displayY, translation.x - 100, translation.y - 20);
    }
};