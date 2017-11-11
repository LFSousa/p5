var snake;
var fr = 10;
function setup() {
  snake = new Dot(floor(random(0,50))*10,floor(random(0,50))*10);
  createCanvas(500,500);
}
function keyPressed(){
    if(keyCode==37) snake.dir.set([-1,0]);
    if(keyCode==38) snake.dir.set([0,-1]);
    if(keyCode==39) snake.dir.set([1,0]);
    if(keyCode==40) snake.dir.set([0,1]);
    if(keyCode==32) snake.addDot();
}
function draw() {
    frameRate(fr);
    fill(50);
    rect(0,0,width,height);
    fill(255);
    noStroke();
    snake.draw();
}