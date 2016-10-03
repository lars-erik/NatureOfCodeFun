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
        branches = 3,
        startColor = [72, 33, 7],
        endColor = [62, 97, 7],
        colorDiffs = [
                endColor[0] - startColor[0],
                endColor[1] - startColor[1],
                endColor[2] - startColor[2]
        ],
        color = startColor,
        length = startLength
    ;

    function iterationColor(iteration) {
        var step = maxIterations - iteration,
            stepFrac = step / maxIterations;

        color = [
            Math.round(startColor[0] + colorDiffs[0] * stepFrac),
            Math.round(startColor[1] + colorDiffs[1] * stepFrac),
            Math.round(startColor[2] + colorDiffs[2] * stepFrac)
        ];
    }

    function hexColor() {
        var r = color[0].toString(16),
            g = color[1].toString(16),
            b = color[2].toString(16);
        r = r.length === 1 ? "0" + r : r;
        g = g.length === 1 ? "0" + g : g;
        b = b.length === 1 ? "0" + b : b;
        return "#" + r + g + b;
    }

    function resized() {
        width = canvas.width = window.innerWidth - 200;
        height = canvas.height = window.innerHeight;
    }

    function updateValue(id, value) {
        eval(id + " = " + value);
        main();
    }

    function inputChanged() {
        var name = this.id,
            value = eval(this.value);
        updateValue(name, value);
    }

    function sliderHandler(id) {
        return function(vp) {
            updateValue(id, vp.newValue);
        }
    }

    function initialize() {
        var inputs = document.getElementsByTagName("input"),
            i;

        for (i = 0; i < inputs.length; i++) {
            $(inputs[i]).slider({
                value: Number(inputs[i].value)
            });

            $(inputs[i]).slider("on", "change", sliderHandler(inputs[i].id));

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
        gfx.fillStyle = hexColor();
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
        var i,
            curAng = angle * -1,
            incAng = angle * 2 / (branches - 1);

        for (i = 0; i < branches; i++) {
            gfx.save();
            iterationColor(iterations);
            gfx.rotate(curAng);
            drawBranch(iterations);
            gfx.restore();
            curAng += incAng;
        }
    }

    function main() {
        color = startColor;
        gfx.clearRect(0, 0, width, height);
        gfx.save();

        gfx.translate(Math.round(width / 2), Math.round(height * .9));
        length = startLength;

        drawBranch(maxIterations);

        gfx.restore();
        //window.requestAnimationFrame(main);
    }

    initialize();

}());