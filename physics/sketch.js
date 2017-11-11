var ball = [];
var gravity = 10;
var gsl;
function setup() {
  createCanvas(500, 500);
  for(var i=0;i<50;i++)
    ball.push(new Ball(i*10+5,random(5, 250),random(0.7, 0.95)))
  gsl = createSlider(0, 20, 10, 0.5);
}
function draw() {
    gravity = gsl.value();
    frameRate(60);
    fill(50);
    rect(0,0,width,height);
    noStroke();
    fill(255);
    for(var i=0;i<ball.length;i++)
    ball[i].draw();
}


function Ball(x,y,k=1){
    this.xo = x;
    this.yo = y;
    this.y = y;
    this.x = x;
    this.vo = 0;
    this.v = 0;
    this.t = 0;
    this.d = 1;
    this.k = k;
    this.draw = function(){
        this.y = this.yo+this.vo*this.t+(gravity*pow(this.t,2))/2;
        this.v = this.vo+gravity*this.t;
        if(this.y<=500-5) this.d = 1;
        if(this.y>500-5 && this.d==1) this.d=-1, this.t = 0, this.yo=this.y, this.vo = -this.v*k;
        if(this.y>500-5)this.y = 500-5;
        ellipse(this.x, this.y, 10);
        this.t+=0.2;
        
    }
}