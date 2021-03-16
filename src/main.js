import p5 from "p5";
import example_1_2 from "./sketches/chapter-01/example.1.2";
import example_1_3 from "./sketches/chapter-01/example.1.3";

const sketches = {
    "Example 01.02": example_1_2,
    "Example 01.03": example_1_3,
}
const defaultSketch = "Example 01.03";
const container = document.getElementById("container");
const menu = document.getElementById("sketches");

let currentSketch = sketches[defaultSketch];
let engine = new p5(currentSketch, container);

function load() {
    let sketchName = menu.value;
    engine.remove();
    currentSketch = sketches[sketchName];
    engine = new p5(currentSketch, container);
}

Object.keys(sketches).forEach(key => {
    let option = document.createElement("option");
    option.text = key;
    menu.appendChild(option);
})
menu.options[Object.keys(sketches).indexOf(defaultSketch)].selected = true;

menu.addEventListener("change", load);
document.getElementById("reset").addEventListener("click", load);