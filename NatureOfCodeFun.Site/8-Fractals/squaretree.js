(function () {
    var canvas,
        gfx,
        width,
        height,
        pos,
        startLength = 300,
        startWidthOffset = .03,
        cutoff = .65,
        angle = Math.PI / 5,
        maxIterations = 6,
        length = startLength
    ;

    function resized() {
        width = canvas.width = window.innerWidth - 200;
        height = canvas.height = window.innerHeight;
    }

    function inputChanged() {
        var name = this.id,
            value = eval(this.value);
        eval(name + " = " + value);
    }

    function initialize() {
        var inputs = document.getElementsByTagName("input"),
            i;

        for (i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("change", inputChanged);
        }

        window.addEventListener("resize", resized);

        canvas = document.getElementById("canvas");
        gfx = canvas.getContext("2d");
        
        resized();

        pos = math.complex(0, 0);

        main();
    }

    function drawBranch(iterations) {
        gfx.beginPath();
        gfx.moveTo(pos.re - length * startWidthOffset, pos.im);
        gfx.lineTo(pos.re + length * startWidthOffset, pos.im);
        gfx.lineTo(pos.re + length * startWidthOffset / 2, pos.im - length);
        gfx.lineTo(pos.re - length * startWidthOffset / 2, pos.im - length);
        gfx.closePath();
        gfx.fillStyle = "white";
        gfx.fill();

        if (iterations > 0) {
            gfx.save();

            gfx.translate(0, length * -1);
            length *= cutoff;

            drawBranches(iterations - 1);

            gfx.restore();
            length /= cutoff;
        }
    }

    function drawBranches(iterations) {
        gfx.save();
        gfx.rotate(angle);
        drawBranch(iterations);
        gfx.restore();

        drawBranch(iterations);

        gfx.save();
        gfx.rotate(angle*-1);
        drawBranch(iterations);
        gfx.restore();
    }

    function main() {
        gfx.clearRect(0, 0, width, height);
        gfx.save();

        gfx.translate(Math.round(width / 2), Math.round(height * .9));
        length = startLength;

        drawBranch(maxIterations);

        gfx.restore();
        window.requestAnimationFrame(main);
    }

    initialize();

}());