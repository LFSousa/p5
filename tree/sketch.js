var n;
var fruits = [];
var board_size = 500;
var node_size = 10;
var fr = 7;
function setup() {
  createCanvas(board_size,board_size);
  fruits.push({x:floor(random(0,board_size/node_size-node_size)),y:floor(random(0,board_size/node_size-node_size))});
  n = new Node(0,0,true);
}
function mouseClicked() {
  n.add();
}
function gameEnd(){
	fr = 7;
  n.prev = null;
}
function keyPressed(){
  switch(keyCode){
    case 37:
      if(n.dir.x != 1) n.dir = {x:-1,y:0};
    break;
    case 38:
      if(n.dir.y != 1) n.dir = {x:0,y:-1};
    break;
    case 39:
      if(n.dir.x != -1) n.dir = {x:1,y:0};
    break;
    case 40:

      if(n.dir.y != -1) n.dir = {x:0,y:1};
    break;
  }
}
function draw() {
  frameRate(fr);
  noStroke();
  fill(50);
  rect(0,0,width,height);
  fill(255,0,0);
  for(i=0;i<fruits.length;i++)
    ellipse(fruits[i].x*node_size+node_size/2,fruits[i].y*node_size+node_size/2,node_size);
  fill(255);
  n.draw();
}