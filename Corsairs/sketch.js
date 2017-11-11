var player;
var gun;
function setup() {
    angleMode(DEGREES);
    createCanvas(500, 500);
    player = new Player(1, 400);
    gun = new Gun(40);
}
function mousePressed(){
    player.changeDir();
    //gun.shoot();
}
function draw() {
    translate(255, 255);
    background(60);
    stroke(255);
    noFill();
    arc(0,0,400,400,0,360);
    gun.draw();
    player.draw();
    text("Angle: "+ player.angle, -240,-240);
    text("Turns: "+ floor(player.angle/360), -240,-220);
}