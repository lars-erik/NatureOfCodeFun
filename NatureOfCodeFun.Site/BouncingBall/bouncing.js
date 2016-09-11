(function() {
    var canvas,
        gfx,
        width,
        height,
        pos,
        radius = 42,
        accelleration = math.complex(.005, .1),
        velocity = math.complex(0, 0);

    function resized() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function initialize() {
        window.addEventListener("resize", resized);

        canvas = document.getElementById("canvas");
        gfx = canvas.getContext("2d");

        resized();

        pos = math.complex(radius, radius);

        main();
    }

    function main() {
        gfx.save();

        gfx.beginPath();
        gfx.arc(pos.re, pos.im, radius + 2, 0, Math.PI * 2);
        gfx.fillStyle = "black";
        gfx.fill();

        if (pos.re >= width - radius || pos.re <= 0 + radius) {
            velocity.re *= -1;
        }
        if (pos.im >= height - radius || pos.im <= 0 + radius) {
            velocity.im *= -1;
        }

        velocity = math.add(velocity, accelleration);
        pos = math.add(pos, velocity);

        gfx.beginPath();
        gfx.arc(pos.re, pos.im, radius, 0, Math.PI * 2);
        gfx.fillStyle = "white";
        gfx.fill();


        gfx.restore();
        window.requestAnimationFrame(main);
    }

    initialize();

}());