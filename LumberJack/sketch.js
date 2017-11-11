var player;
var blocks = [];
function setup() {
    createCanvas(400, 400);
    player = new Player();
    blocks = new Block(5);
}
function draw() {
    background(50);
    noStroke();
    fill(255,150);
    player.draw();
    blocks.update();
    blocks.draw();
}

function mousePressed(){
    player.change();
}

function Player(){
    this.dir = 1;
    this.change = function(){
        this.dir *= -1;
        for(var i=0;i<blocks.length;i++)
            blocks[i].pos.y++;
    }
    this.draw = function(){
        ellipse(width/2-60*this.dir, height-30, 50,50);
    }
}

function Block(pos){
    this.pos = createVector(width/2, pos*60);
    this.acc = createVector(0,0);
    this.vel = createVector(0,0);
    this.prev = null;
    
    this.update = function(){
    }
    this.checkColision = function(){
        for(var i=0;i<blocks.length;i++){
            var dist = this.pos.dist(blocks[i].pos);
            if(dist!=0 && dist<60) return true;
            else return false;
        }
    }
    this.draw = function(){
        rectMode(CENTER);
        rect(this.pos.x,this.pos.y,60,60);
    }
}