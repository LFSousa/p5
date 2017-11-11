var distance = 0, longdist = 0;
var longest;
var genFinished = false;
function genSetup() {
    cows = floor(width/w);
    rows = floor(height/w);
    for(var i=0;i<rows;i++){
        for(var j=0;j<cows;j++){
            cells.push(new Cell(j,i));
        }
    }
    current = cells[0];
    longest = current;
    current.visited = true;
}
function genDraw() {
    //frameRate(100);
    background(100,0,100,50);
    for(var i=0;i<cells.length;i++){
        cells[i].draw();
    }

    var neighbours = current.checkNeighbours();
    if(neighbours.length>0){
        var next = random(neighbours);
        next.visited = true;
        removeWall(current,next);
        stack.push(next);
        current = next;
        distance++;
    }
    else{
        if(stack.length>0)
        current = stack.pop();
        else current = cells[0], genFinished = true;
        distance--;
    }
    if(longdist<distance){
        longdist = distance;
        longest = current;
    }
    fill(100,255,100,100);
    noStroke();
    ellipse(0.5*w+w*current.i,0.5*w+w*current.j,w/2,w/2);
    fill(255,0,255);
    ellipse(0.5*w+w*longest.i,0.5*w+w*longest.j,w/2,w/2);
}
function index(i,j){
    return i<0||j<0||i>cows-1||j>rows-1?-1:i+j*cows;
}
function Cell(i,j){
    this.i = i;
    this.j = j;
    this.visited = false;
    this.walls = [true,true,true,true];
    this.draw = function(){
        if(this.visited)
            fill(50);
        else
            noFill();
        noStroke();
        rect(this.i*w, this.j*w, w,w);
        stroke(255);
        if(this.walls[0]){
            line(w*(this.i),w*(this.j),w*(this.i+1),w*(this.j));
        }
        if(this.walls[1]){
            line(w*(this.i+1),w*(this.j),w*(this.i+1),w*(this.j+1));
        }
        if(this.walls[2]){
            line(w*(this.i),w*(this.j+1),w*(this.i+1),w*(this.j+1));
        }
        if(this.walls[3]){
            line(w*(this.i),w*(this.j),w*(this.i),w*(this.j+1));
        }
    }

    this.checkNeighbours = function(){
        var neighbours = [];
        var top = cells[index(this.i,this.j-1)];
        var right = cells[index(this.i+1,this.j)];
        var bottom = cells[index(this.i,this.j+1)];
        var left = cells[index(this.i-1,this.j)];
        if(top && !top.visited)
            neighbours.push(top);
        if(right && !right.visited)
            neighbours.push(right);
        if(bottom && !bottom.visited)
            neighbours.push(bottom);
        if(left && !left.visited)
            neighbours.push(left);
        return neighbours;
    }
}

function removeWall(a,b){
    if(a.j-b.j == 1){ //top
        a.walls[0] = false;
        b.walls[2] = false;
    }
    if(a.i-b.i == -1){ //right
        a.walls[1] = false;
        b.walls[3] = false;
    }
    if(a.j-b.j == -1){ //bottom
        a.walls[2] = false;
        b.walls[0] = false;        
    }
    if(a.i-b.i == 1){ //left
        a.walls[3] = false; 
        b.walls[1] = false;       
    }
}