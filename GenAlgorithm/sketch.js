var rockets = [];
var count = 0;
var alvo;
var scr, inputs;
var pool = [];
var geracao = 1;
var totalR = 1000;
var totalTicks = 1000;
var bars = [];
var barW = 200;
var barH = 10;
var mutf = 0.01;
var velocity = 0.6;
var actives = totalR;
function setup() {
    createCanvas(500,600);
    newGen();
    alvo = createVector(width/2, 30);
    scr = createP();
    //inputs = createP();
    bars.push([createVector(0,400), 25]);
    bars.push([createVector(200,400), 25]);
    bars.push([createVector(300,300), 30]);
    bars.push([createVector(100,300), 30]);
    bars.push([createVector(0,200), 20]);
    bars.push([createVector(200,200), 20]);
    bars.push([createVector(300,100), 10]);
    bars.push([createVector(100,100), 10]);
}

function newGen(){
    count = 0;
    for(var i=0; i< totalR; i++){
        rockets[i] = new Rocket();
    }
}
function draw() {
    background(50);
    noStroke();
    fill(255, 150);
    ellipse(alvo.x,alvo.y,20,20);
    for(var i=0; i< bars.length; i++){
        rect(bars[i][0].x, bars[i][0].y, barW, barH);
        //text(bars[i][1], bars[i][0].x,bars[i][0].y-10);
    }
    //actives = totalTicks;
    for(var i=0; i< totalR; i++){
        rockets[i].update();
        rockets[i].draw();
    }
    count++;

    scr.html(count + "<br>Geracao: "+geracao + "<br>Ativos: "+actives);
    if(count == totalTicks || actives == 0){
        evaluate();
    
        selection();
        count=0;
    }
}

function evaluate(){
    actives = totalR;
    pool = [];
    var mfitness = 0;
    for(var i=0; i< rockets.length; i++){
        rockets[i].calcFitness();
        if(mfitness < rockets[i].fitness) mfitness = rockets[i].fitness;
    }
    for(var i=0; i< rockets.length; i++){
        rockets[i].fitness/=mfitness;
    }
    for(var i=0; i< rockets.length; i++){
        var n = rockets[i].fitness*100;
        //console.log(n);
        //text(n, rockets[i].pos.x, rockets[i].pos.y);
        for(var j=0; j < n; j++){
            pool.push(rockets[i]);
        }

    }
    //console.log(pool);
    geracao++;
}
function selection(){
    var newR = [];
    for(var i=0;i<this.rockets.length;i++){
        var A = random(this.pool).dna;
        var B = random(this.pool).dna;
        var child = A.cross(B);
        child.mutation();
        newR[i] = new Rocket(child);
    }
    // inputs.html(
    //     "<textarea>"+
    //     newR+
    //     "</textarea>"
    // );
    rockets = newR;
}
function DNA(new_genes){
    if(new_genes)
        this.genes = new_genes;
    else{
        this.genes = [];
        for(var i = 0; i<totalTicks; i++){
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(velocity);
        }
    }
    this.cross = function(parent){
        var new_genes = [];
        var m = floor(random(this.genes.length));
        for(var i = 0; i< this.genes.length; i++){
            if(i<m)
                new_genes[i] = this.genes[i];
            else
                new_genes[i] = parent.genes[i];
        } 
        return new DNA(new_genes);
    }
    this.mutation = function(){
        for(var i=0;i<this.genes.length;i++){
            if(random(1) < mutf){
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(velocity);
                //console.log("Mutacao: Geracao ", geracao, ", Gene ", i);
            }
        }
    }
}
var maxTimeFit = 0;
function Rocket(new_dna){
    this.pos = createVector(width/2,height-10);
    this.acc = createVector();
    this.vel = createVector(0,0);
    this.time = 0;
    if(!new_dna)
        this.dna = new DNA();
    else this.dna = new_dna;
    this.completed = false;
    this.active = true;
    this.fitness = 0;
    this.fitDec = 100;
    this.calcFitness = function(){
        var d =  dist(alvo.x, alvo.y, this.pos.x, this.pos.y);
        this.fitness = map(d, 0, width, width, 0);
        var mf = 30*this.time/totalTicks;
        if(this.completed) this.fitness *= mf > 10 ? mf : 10;
        if(!this.active) this.fitness/=this.fitDec;
    }

    this.update = function(){

        if(!this.active || this.completed) return;
        var d = dist(this.pos.x, this.pos.y, alvo.x, alvo.y);
         if (d < 20) {
          this.completed = true;
          this.time = totalTicks-count;
          this.pos = alvo.copy();
        }
        this.acc.add(this.dna.genes[count]);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(4);
        if(this.pos.x > width || this.pos.x < 0)
            this.active = false;
        if(this.pos.y > height || this.pos.y < 0)
            this.active = false;
        for(var i=0; i< bars.length; i++){
            if(this.pos.x > bars[i][0].x && this.pos.x < bars[i][0].x + barW
            && this.pos.y > bars[i][0].y && this.pos.y < bars[i][0].y + barH)this.active = false, this.fitDec = bars[i][1];
        }
        if(!this.active || this.completed) actives--;
    }

    this.draw = function(){
        push();
        translate(this.pos.x, this.pos.y);
        fill(255, 150);
		rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0,0, 30, 5);
        translate(-this.pos.x, -this.pos.y);
        pop();
    }
}