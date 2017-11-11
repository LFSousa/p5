function Node(x,y,head=false){
    this.x = x;
    this.y = y;
    this.dir = {x:0,y:0};
    this.prev = null;
    this.add = function(){
        if(this.prev==null)
            this.prev = new Node(this.x,this.y);
        else
            this.prev.add();
    }
    this.checkNodeColision = function(x,y){
        if(this.prev==null) return false;
        if(!head&&this.prev.x==x&&this.prev.y==y){
            gameEnd(); 
            return true;
        }
        this.prev.checkNodeColision(x,y);
    }
    this.checkColision = function(){
        for(i=0;i<fruits.length;i++) if(fruits[i].x*node_size==this.x&&fruits[i].y*node_size==this.y) return i;
        return -1;
    }
    this.draw = function(){
        var p;
        if((p=this.checkColision())!=-1){
            if(head) fruits.push({x:floor(random(0,width/node_size-node_size)),y:floor(random(0,height/node_size-node_size))}), this.add(), fr++;
            ellipse(this.x+node_size/2,this.y+node_size/2,node_size+2);
            if(this.prev==null) fruits.splice(p,1);
        }
        else
            ellipse(this.x+node_size/2,this.y+node_size/2,node_size);
        this.x += this.dir.x*node_size;
        this.y += this.dir.y*node_size;
        if(this.x > width-node_size) gameEnd();
        if(this.y > height-node_size) gameEnd();
        if(this.x < 0) this.x = gameEnd();
        if(this.y < 0) this.y = gameEnd();

        if(this.prev != null)this.prev.draw(), this.prev.dir = this.dir;
        this.checkNodeColision(this.x,this.y);
    }
}