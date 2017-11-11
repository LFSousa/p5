var cells = [];
var cows, rows;
var w = 25;
var current;
var stack = [];
var finder = undefined;
var ovf = [];
function setup() {
    createCanvas(windowWidth,windowHeight);
    genSetup();
    ovf[0] = width-cows*w;
    ovf[1] = height-rows*w;
}
function draw() {
    translate(ovf[0]/2, ovf[1]/2);
    genDraw();
    if(genFinished){
        if(!finder)
            finder = new Finder(), console.log("finding");
        else finder.draw();
    }
}