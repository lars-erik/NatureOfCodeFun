import { Vector } from "p5";

class Circle {
    #local;
    #screen;
    
    constructor(p, localPos, radius, strokeWeight, stroke, fill) {
        this.p = p;
        this.#local = localPos || new Vector(0, 0);
        this.#screen = new Vector(0, 0);
        this.radius = radius || 30;
        this.strokeWeight = strokeWeight || 2;
        this.stroke = stroke || 60;
        this.fill = fill || 175; 
    }

    draw() {
        let screenLoc = this.screen();

        this.p.strokeWeight(this.strokeWeight);
        this.p.stroke(this.stroke);
        this.p.fill(this.fill);
        this.p.ellipse(screenLoc.x, screenLoc.y, this.radius, this.radius);
    }
    
    local(v) {
        if (v) {
            this.#local = v;
            this.#screen = this.p.toScreen(v)
        }
        return this.#local;
    }

    screen(v) {
        if (v) {
            this.#screen = v;
            this.#local = this.p.toLocal(v);
        }
        return this.#screen;
    }
}

class Knob extends Circle {

    constructor(p, localPos, name, radius, strokeWeight, stroke, fill) {
        super(p, localPos, radius, strokeWeight, stroke, fill);
        this.name = name;
    }

    draw() {
        super.draw();
        
        this.p.stroke(0,0,0,0);
        this.p.fill(0);
        this.p.textAlign(this.p.CENTER);
        this.p.text(this.name, this.screen().x, this.screen().y + this.radius / 3.5);
    }

}

export default function (p) {
    const pointRadius = 15;

    let translation = new Vector(0, 0, 1);
    let ctx;
    const maxIters = 1000;

    let aKnob = new Knob(p, new Vector(0, 0), 'A', pointRadius, 2)
    let cKnob = new Knob(p, new Vector(0, 0), 'C', pointRadius, 2)

    p.setup = function (c) {
        ctx = c;
        p.background(255);

        p.keyPressed = () => {
        }

        p.toScreen = (v) => {
            return v
                .copy()
                .mult(1, -1)
                .div(2)
                .add([.5 * p.width / p.height, .5])
                .mult([p.height, p.height])
                .sub(translation);
        };

        p.toLocal = (v) => {
            return v.copy()
                .add(translation)
                .div([p.height, p.height])
                .sub([.5 * p.width / p.height, .5])
                .mult(2)
                .mult(1, -1);
        }
    };

    let drawGrid = () => {
        p.strokeWeight(3);
        p.stroke(150);
        ctx.drawingContext.setLineDash([10, 15]);

        let lw = Math.ceil(p.width / 100) * 100;
        let lh = Math.ceil(p.height / 100) * 100

        p.line(lw / -2 - 5, 0, lw / 2, 0)
        p.line(0, lh / -2 - 5, 0, lh / 2);

        let unitScr = p.toScreen(new Vector(2, 2));
        p.fill(0, 0, 0, 0);
        p.ellipse(0, 0, unitScr.x, unitScr.y);
       
        ctx.drawingContext.setLineDash([1, 0]);
    }

    let drawCoords = (points) => {
        const displayX = Math.round(aKnob.local().x * 100) / 100;
        const displayY = Math.round(aKnob.local().y * 100) / 100;
        const displayXC = Math.round(cKnob.local().x * 100) / 100;
        const displayYC = Math.round(cKnob.local().y * 100) / 100;

        p.stroke(0);
        p.strokeWeight(0);
        p.fill(0);
        p.textAlign(p.RIGHT);
        p.text(displayX + "+" + displayY + "i | " + 
               displayXC + "+" + displayYC + "i | " + 
               points.length + " | " +
               points[points.length - 1].dist(points[points.length - 2]), translation.x - 20, translation.y - 20);
    }

    let drawConnectedDots = (points) => {
        for(var i = points.length - 1; i>0; i--) {
            let squarePos = p.toScreen(points[i]);
            let prevPos = p.toScreen(points[i-1]);

            p.stroke(60);
            p.strokeWeight(1);
            p.line(prevPos.x, prevPos.y, squarePos.x, squarePos.y);
        }
        for(var i = points.length - 1; i>0; i--) {
            let squarePos = p.toScreen(points[i]);

            p.strokeWeight(2);
            p.fill(190);
            p.ellipse(squarePos.x, squarePos.y, pointRadius - 5, pointRadius - 5);
        }
    }

    let iterate = (a, c) => {
        let prev = a;
        let square = a;
        let points = [a];
        let iters = 0;

        do {
            prev = points[points.length - 1];
            square = new Vector(
                prev.x ** 2 - prev.y ** 2,
                prev.x * prev.y * 2
            ).add(c);
            points.push(square);
        } while(square.mag() < 2 && iters++ < maxIters - 2)

        return points;
    }

    p.draw = function () {
        translation = new Vector(p.width / 2, p.height / 2);
        p.mouse = new Vector(p.mouseX, p.mouseY).sub(translation);

        let knobs = [aKnob, cKnob];
        for(var i = 0; i<knobs.length; i++) {
            let knob = knobs[i];
            if (p.mouseIsPressed && p.mouse.dist(knob.screen()) < pointRadius) {
                knob.dragging = true;
            } else if (!p.mouseIsPressed) {
                knob.dragging = false;
            }
            if (knob.dragging) {
                knob.screen(p.mouse);
                break;
            }
        };

        p.background(255);
        p.translate(translation.x, translation.y);

        drawGrid();

        let points = iterate(aKnob.local(), cKnob.local());

        drawConnectedDots(points);

        cKnob.draw(p);
        aKnob.draw(p);

        drawCoords(points);
    }
};