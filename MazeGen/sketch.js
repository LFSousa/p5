var cells = [];
var cows, rows, button;
var w = 50;
var current;
var stack = [];
var finder = undefined;
var ovf = [];
function setup() {
    createCanvas(windowWidth,windowHeight);
    genSetup();
    ovf[0] = width-cows*w;
    ovf[1] = height-rows*w;
    button = createButton("Solve");
    button.mousePressed(solveNow);
    button.position(ovf[0]/2+1, ovf[1]/2+1);
    button.style('width', w-1+'px');
    button.style('height', w-1+'px');
    button.style('background', 'rgb(100,0,100)');
    button.style('border', '0px');
    button.style('color', 'white');
    button.hide();
}
function draw() {
    translate(ovf[0]/2, ovf[1]/2);
    genDraw();
    if(genFinished){
        if(finder)
            finder.draw();
        else button.show();
    }
}
function solveNow(){
    finder = new Finder();
    button.hide();
}