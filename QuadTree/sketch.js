var quad;
var obj = [];
function setup() {
    createCanvas(700,700);
    quad = new Quadtree({
        x:0,
        y:0,
        width: width,
        height: height
    }, 4);
    for(var i=0;i<566;i++)
    addObj();
}

function addObj(){
    var o = {
        x: random(0,500),
        y: random(0,500),
        width: 20,
        height: 20,
        velx: random(-2,2),
        vely: random(-2,2),
        alpha: 50
    }
    obj.push(o);
    quad.insert(o);
}
function update(o){
    quad.removeObject(o);
    o.alpha = 50;
    o.x += o.velx;
    o.y += o.vely;
    if(o.x>width || o.x < 0) o.velx *= -1;
    if(o.y>height || o.y < 0) o.vely *= -1;
    quad.insert(o);
    quad.cleanup();
}
function draw() {
    background(50);
    noFill();
    stroke(255);
    var cur = {
        x: mouseX,
        y: mouseY,
        width: 20,
        height: 20
    }
    rect(cur.x, cur.y, cur.width, cur.height);
    fill(255);
    noStroke();

    var can = quad.retrieve(cur);
    for(var i=0;i<can.length;i++){
        can[i].alpha = 255;
        if(dist(can[i].x,can[i].y,cur.x,cur.y) < 10) can[i].x+=random(-1,1);
    }
    //console.log(can);
    for(var i=0;i<obj.length;i++){
        fill(255,obj[i].alpha);
        ellipse(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
        update(obj[i]);
    }
    drawBounds(quad.nodes);
}

function drawBounds(nd){
    for(var i=0;i<quad.nodes.length;i++){
        noFill();
        stroke(255,100);
        rect(nd[i].bounds.x, nd[i].bounds.y,nd[i].bounds.width,nd[i].bounds.height );
        if(nd[i].nodes.length > 0) drawBounds(nd[i].nodes);
    }
}