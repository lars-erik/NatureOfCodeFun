import p5 from "p5";
import resizingSketch from "./sketches/resizingSketch";
import example_1_2 from "./sketches/chapter-01/example.1.2";
import example_1_3 from "./sketches/chapter-01/example.1.3";
import example_1_6 from "./sketches/chapter-01/example.1.6";

import nf_1 from "./sketches/mandelbrot/numberfile-render-squares";
import nf_2 from "./sketches/mandelbrot/numberfile-render-limits";

const sketches = {
    "Example 01.02": example_1_2,
    "Example 01.03": example_1_3,
    "Example 01.06 Normalized vector": example_1_6,
    "Render squares": nf_1,
    "Render limits": nf_2,
}
const defaultSketch = "Render limits";
const container = document.getElementById("container");
const menu = document.getElementById("sketches");

let currentSketch = sketches[defaultSketch];
let engine = null;

function load() {
    let sketchName = menu.value;
    if (engine) {
        engine.remove();
    }
    currentSketch = sketches[sketchName];
    engine = new p5(resizingSketch(currentSketch), container);
    window.engine = engine;
}

Object.keys(sketches).forEach(key => {
    let option = document.createElement("option");
    option.text = key;
    menu.appendChild(option);
})
menu.options[Object.keys(sketches).indexOf(defaultSketch)].selected = true;

menu.addEventListener("change", load);
document.getElementById("reset").addEventListener("click", load);

load();