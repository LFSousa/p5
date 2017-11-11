function Dot(x, y){
    this.pos = createVector(x,y);
    this.prev = null;
    this.dir = createVector(0, 0);
    this.addDot = function(){
        if(this.prev==null)this.prev = new Dot(this.pos.x, this.pos.y);
        else this.prev.addDot();
    }
    this.checkCollision = function(pos){
        if(this.prev!=null) {
            if(this.prev.pos.dist(pos) === 0) fr = 0;
            this.prev.checkCollision(pos);
        }
    }
    this.draw = function(){
        ellipse(this.pos.x-5, this.pos.y-5, 10);
        this.pos.x += this.dir.x*10;
        this.pos.y += this.dir.y*10;
        if(this.prev!=null) this.prev.draw(), this.prev.dir = this.dir.copy();
        this.checkCollision(this.pos)
    }
}