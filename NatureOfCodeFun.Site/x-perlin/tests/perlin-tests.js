/// <reference path="../../Scripts/math.js" />
/// <reference path="../perlin.js" />
(function() {

    function inRange(value) {
        expect(value).not.toBe(0);
        expect(value).toBeGreaterThan(-1);
        expect(value).toBeLessThan(1);
    }

    describe("when intializing", function () {

        it("should create random gradient for each whole grid vertice", function() {
            function gradInRange(gradient) {
                inRange(gradient[0]);
                inRange(gradient[1]);
            }

            var set = new noise.perlin(2);

            gradInRange(set.gradient(0, 0));
            gradInRange(set.gradient(1, 1));
        });

    });

    describe("when getting a coordinate", function() {
        it("should have a value", function () {
            var set = new noise.perlin(2),
                value = set.noise([0.5, 0.5]);
            inRange(value);
        });
    });

    describe("when intializing 3d", function () {

        it("should create random gradient for each whole grid vertice", function () {
            function gradInRange(gradient) {
                inRange(gradient[0]);
                inRange(gradient[1]);
                inRange(gradient[2]);
            }

            var set = new noise.perlin(2, 3);

            gradInRange(set.gradient(0, 0, 0));
            gradInRange(set.gradient(1, 1, 1));
        });

    });

    describe("when getting a 3d coordinate", function () {
        it("should have a value", function () {
            var set = new noise.perlin(2, 3),
                value = set.noise([0.5, 0.5, 0.5]);
            inRange(value);
        });

        it("adjacent on z should not be equal", function () {
            var set = new noise.perlin(2, 3),
                value1 = set.noise([0.5, 0.5, 0.5]),
                value2 = set.noise([0.5, 0.5, 0.6])
            ;
            console.log(value1);
            console.log(value2);
            expect(value1).not.toEqual(value2);
        });
    });



}());