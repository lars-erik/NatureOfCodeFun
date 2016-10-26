var noise = (function() {

    function perlin(size) {
        var gradients = new Array(size);

        function init() {
            var x, y, v, h, s;
            for (y = 0; y < size; y++) {
                gradients[y] = new Array(size);
                for (x = 0; x < size; x++) {
                    v = [Math.random() * 2 - 1, Math.random() * 2 - 1];
                    h = 1 / Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
                    v[0] = v[0] * h;
                    v[1] = v[1] * h;
                    gradients[y][x] = v;
                }
                gradients[y][size] = gradients[y][0];
            }
            gradients[y] = gradients[0];
        }

        this.gradient = function(x, y) {
            return gradients[y][x];
        }

        function subtract(a, b) {
            return [a[0] - b[0], a[1] - b[1]];
        }

        function dot(a, b) {
            return a[0] * b[0] + a[1] * b[1];
        }

        this.noise = function(v) {
            var xf = Math.floor(v[0] % size),
                yf = Math.floor(v[1] % size),
                xsf = v[0] % 1,
                ysf = v[1] % 1,
                xe = 3 * Math.pow(xsf, 2) - 2 * Math.pow(xsf, 3),
                ye = 3 * Math.pow(ysf, 2) - 2 * Math.pow(ysf, 3),
                xse = xf + xsf,
                yse = yf + ysf,
                sv = [xse, yse],
                ul = gradients[yf][xf],
                ulv = [xf, yf],
                ur = gradients[yf][xf + 1],
                urv = [xf + 1, yf],
                bl = gradients[yf + 1][xf],
                blv = [xf, yf + 1],
                br = gradients[yf + 1][xf + 1],
                brv = [xf + 1, yf + 1],
                uld = subtract(sv, ulv),
                urd = subtract(sv, urv),
                bld = subtract(sv, blv),
                brd = subtract(sv, brv),
                dp1 = dot(ul, uld),
                dp2 = dot(ur, urd),
                dp3 = dot(bl, bld),
                dp4 = dot(br, brd),
                z1 = (dp1 * (1 - xe) + dp2 * (xe)),
                z2 = (dp3 * (1 - xe) + dp4 * xe),
                val = (z1 * (1 - ye) + z2 * ye);
            return val;
        }

        init();
    }
    
    return {
        perlin: perlin
    }

}());