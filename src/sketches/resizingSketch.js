export default function(innerSketch) {
    return (p) => {
        innerSketch(p);

        window.addEventListener("resize", () => {
            p.width = window.innerWidth;
            p.height = window.innerHeight - 50;
            p.resizeCanvas(p.width, p.height);
        });

        let inner = {
            setup: p.setup,
            draw: p.draw
        };

        p.setup = () => {
            p.width = window.innerWidth;
            p.height = window.innerHeight - 50;
            p.createCanvas(p.width, p.height);
            inner.setup();
        }

        p.draw = () => {
            inner.draw();
        }
    }
}