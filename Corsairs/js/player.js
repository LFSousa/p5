function Player(vel, radius){
    this.vel = vel;
    this.dir = 1;
    this.angle = 0;
    this.radius = radius;
    this.pos = createVector(0, 0);
    this.points = 0;
    this.draw = function(){
        this.pos.set([(this.radius/2)*cos(this.angle),(this.radius/2)*sin(this.angle)]);
        ellipse(this.pos.x, this.pos.y, 30);
        this.angle+=this.vel*this.dir;
    }

    this.changeDir = function(){
        this.dir*=-1;
        gun.fireMode = 4;
    }
}