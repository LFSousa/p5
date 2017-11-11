function Gun(delay){
    this.delay = delay;
    this.inc = delay;
    this.bullets = [];
    this.fireMode = 0;
    this.fireVel = 7;
    this.draw = function(){
        ellipse(0, 0, 40);
        for(var i=0;i<this.bullets.length;i++){
            if(this.bullets[i].pos.dist(createVector(0,0)) > player.radius){
                this.bullets.splice(i,1);
                continue;
            }
            this.bullets[i].draw();
        }
        if(this.inc > this.delay - floor(player.angle/360)*2 ) this.shoot(), this.inc = 0;
        this.inc++;
    }
    this.shoot = function(){
        var a;
        this.fireMode = floor(random(4));
        var calcAngle = player.vel * 170 / this.fireVel; //1=bull vel
        if (this.fireMode == 4) {
         this.fireMode = 0;
          a = player.angle*player.dir + random(45,90);
        } else if (this.fireMode == 3) {
          a = player.angle;
        } else if (this.fireMode == 2) {
            this.fireMode = 0;
          a = player.angle + calcAngle*player.dir;
        } else {
          a = player.angle + calcAngle*player.dir;
          a += random(30,60);
        }
        //var ang = player.angle + player.dir*player.vel * 94 / player.vel;
        this.bullets.push(new Bullet(this.fireVel, a
            //player.angle + random(45,90)
            
            //player.angle + player.vel*100*player.dir + 0.2*player.dir
        ));
    }
}

function Bullet(vel, ang){
    this.ang = ang;
    this.vel = vel;
    this.pos = createVector(30*cos(this.ang), 30*sin(this.ang));
    this.draw = function(){
        this.pos.add(this.vel*cos(this.ang),this.vel*sin(this.ang));
        ellipse(this.pos.x, this.pos.y, 10);
        if(this.pos.dist(player.pos) < 10) noLoop();
    }
}