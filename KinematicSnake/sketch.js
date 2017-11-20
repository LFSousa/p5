var seg, pos, vel, totalP = 1000;
function setup() {
    createCanvas(screen.width,screen.height);
    pos = createVector(1,1);
    vel = createVector();
    seg = new Segment(0,0,1, totalP);
    var o = seg;
    for(i=0;i<totalP;i++){
        var n = new Segment(0,0,seg.len, i, totalP);
        seg.parent = n;
        seg.parent.ch = seg;
        seg = n;
    }
    seg = o;
}
function draw() {
    background(50);
    seg.follow(pos.x, pos.y);
    seg.update();
    seg.draw();
    var cur = seg.parent;
    for(i=0;i<totalP;i++){
        cur.follow(cur.ch.a.x, cur.ch.a.y);
        cur.update();
        cur.draw();
        cur = cur.parent;
    }
    move();
}
var followMouse = true;
function mousePressed(){
    followMouse = !followMouse;
}
function move(){
    if(followMouse){
        var p = createVector(mouseX, mouseY);
        vel = p5.Vector.fromAngle(atan2(p.y-pos.y, p.x-pos.x ));
        vel.normalize();
        vel.mult(10);
        pos.add(vel);
    }
    else pos.x = mouseX, pos.y = mouseY;
    if(dist(pos.x,pos.y,mouseX,mouseY) < 5) followMouse = false;
}


function Segment(x, y, len, w=0, total=1){
    this.a = createVector(x, y);
    this.b = createVector(x+len, y);
    this.w = w;
    this.ang = 0;
    this.len = len;
    this.parent = null;
    this.update = function(){
        this.a.x = len*cos(this.ang)+this.b.x;
        this.a.y = len*sin(this.ang)+this.b.y;
    }

    this.follow = function(x, y){
        this.b.x = x;
        this.b.y = y;
        this.ang = atan2((this.a.y-this.b.y), (this.a.x-this.b.x));
    }

    this.draw = function(){
        stroke(255,map(this.w, 0, total, 10,0));
        strokeWeight(30);
        if(this.w>total*2/3)
            strokeWeight(map(this.w, total*2/3, total, 30,0));
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}