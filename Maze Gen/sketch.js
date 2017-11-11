var cells = [];
var cows, rows;
var w = 25;
var current;
var stack = [];
var finder = undefined;
function setup() {
    createCanvas(700,700);
    genSetup();
}
function draw() {
    genDraw();
    if(genFinished){
        if(!finder)
            finder = new Finder(), console.log("finding");
        else finder.draw();
    }
}