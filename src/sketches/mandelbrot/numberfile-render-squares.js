import { Vector } from "p5";

export default function(p) {
    const pointRadius = 15;

    let location = new Vector(0, 0);
    let velocity = new Vector(3, 10);
    let translation = new Vector(0, 0, 1);
    let dragging = false;
    let ctx;

    p.setup = function(c) {
        ctx = c;
        p.background(255);
    };

    p.draw = function() {
        translation.x = p.width/2;
        translation.y = p.height/2;
        let mouse = new Vector(p.mouseX, p.mouseY).sub(translation);

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

        let lw = Math.ceil(p.width/100)*100;
        let lh = Math.ceil(p.height/100)*100

        p.line(lw/-2-5, 0, lw/2, 0)
        p.line(0, lh/-2-5, 0, lh/2);

        ctx.drawingContext.setLineDash([1,0]);
        p.strokeWeight(2);
        p.stroke(60);
        p.fill(175);
        p.ellipse(location.x, location.y, pointRadius, pointRadius);

        let fracLoc = location.copy()
            .add(translation)
            .div([p.height,p.height])
            .sub([.5*p.width/p.height,.5])
            .mult(2)
            .mult(1, -1);

        let square = new Vector(
            fracLoc.x**2 - fracLoc.y**2,
            fracLoc.x*fracLoc.y*2
        );
        let squarePos = square
            .copy()
            .mult(1, -1)
            .div(2)
            .add([.5*p.width/p.height,.5])
            .mult([p.height,p.height])
            .sub(translation);
        
        p.strokeWeight(2);
        p.stroke(60);
        p.fill(190);
        p.ellipse(squarePos.x, squarePos.y, pointRadius - 5, pointRadius - 5);

        
        const displayX = Math.round(fracLoc.x * 100) / 100;
        const displayY = Math.round(fracLoc.y * 100) / 100;
        const displayX2 = Math.round(square.x * 100) / 100;
        const displayY2 = Math.round(square.y * 100) / 100;
        p.stroke(0);
        p.strokeWeight(0);
        p.fill(0);
        p.textAlign(p.RIGHT);
        p.text(displayX + "x" + displayY + " | " + displayX2 + "x" + displayY2, translation.x - 100, translation.y - 20);

    }
};