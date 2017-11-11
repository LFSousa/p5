var population;
var lifetime = 400;
var count = 0;
var alvo;
var mutf = 0.02;
function setup() {
    createCanvas(400,400); 
    alvo = createVector(width/2, 40);
    population = new Population(25);   
}
function draw() {
    background(50);
    fill(255, 150);
    noStroke();
    ellipse(alvo.x, alvo.y, 20, 20);
    population.run();
}


function Population(quant){
    this.rockets = [];
    for(var i=0; i<quant; i++){
        this.rockets.push(new Rocket());
    }

    this.run = function(){
        for(var i = 0; i<this.rockets.length;i++){
            this.rockets[i].update();
            this.rockets[i].draw();
        }
        count++;
        if(count == lifetime){
            this.evaluate();
            count = 0;
        }
    }

    this.evaluate = function(){
        var maxfit = 0;
        var pool = [];
        for(var i=0; i<this.rockets.length; i++){
            this.rockets[i].calcFitness();
            if(this.rockets[i].fitness > maxfit) maxfit = this.rockets[i].fitness;
        }
        for(var i=0; i<this.rockets.length; i++){
            this.rockets[i].fitness /= maxfit;

            for(var j = 0; j<this.rockets[i].fitness*100; j++){
                pool.push(this.rockets[i].dna);
            }
        }
        var new_rockets = [];
        for(var i=0; i<this.rockets.length;i++){
            var A = random(pool);
            var B = random(pool);
            //console.log(A, B);
            var new_dna = A.cross(B);
            new_dna.mutation();
            new_rockets.push(new Rocket(new_dna));
        }
        this.rockets = new_rockets;
        //console.log(new_rockets);
    }
}

function DNA(old){
    if(old)
        this.genes = old;
    else{
        this.genes = [];
        for(var i = 0; i<lifetime; i++){
            this.genes.push(p5.Vector.random2D().setMag(0.2));
        }
    }

    this.cross = function(parent){
        var new_genes = [];
        var m = floor(random(this.genes.length));
        for(var i=0; i< this.genes.length; i++){
            if(i>m)
                new_genes.push(this.genes[i]);
            else 
                new_genes.push(parent.genes[i]);
        }
        return new DNA(new_genes);
    }

    this.mutation = function(){
        for(var i=0;i<this.genes.length;i++){
            if(random(1) < mutf){
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.2);
            }                
        }
    }
}

function Rocket(old_dna){
    this.pos = createVector(width/2,height/2);
    this.vel = createVector();
    this.acc = createVector();
    if(old_dna) this.dna = old_dna;
    else this.dna = new DNA();
    this.fitness = 0;
    this.completed = false;
    this.crashed = false;
    this.update = function(){
        var d = this.pos.dist(alvo);
        if(d < 10){
            this.completed = true;
            this.pos = alvo.copy();
        }
        if(this.completed || this.crashed) return;
        this.acc.add(this.dna.genes[count]);
        this.acc.setMag(0.2);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        if(this.pos.x > width || this.pos.x < 0
        || this.pos.y > height || this.pos.y < 0)
            this.crashed = true;
    }
    this.calcFitness = function(){
        var d = this.pos.dist(alvo);
        this.fitness = map(d, 0, width, width, 0);
        if(this.completed) this.fitness *= 10;
        if(this.crashed) this.fitness /= 10;
    }
    this.draw = function(){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0,0,30,5);
        translate(-this.pos.x, -this.pos.y);
        pop();
    }
}