let DINOS = 10;
let dino;
let obstacles = [];
let timer = 10;
let timeWas = 0;
let generation = 0;
let deadDinos = [];
let livingDinos = [];
let bestDino;
let bestScore = 0;
let count = 0;
let runBestDino = false;

function setup(){
    createCanvas(800, 400);
    frameRate(20);
    createDinos();
}

function draw(){
    background(0);
    stroke(255);
    line(0, 350, 800, 350);

    let g = document.getElementById('generation');

    if(runBestDino){
        dino = bestDino;
        g.innerHTML = 'Running Best Dino';
    }else{
        dino = livingDinos[deadDinos.length];
        g.innerHTML = 'Generation: ' + generation;
    }


    let s = document.getElementById('score');
    s.innerHTML = 'Score: ' + dino.score;

    let b = document.getElementById('bestScore');
    b.innerHTML = 'Best Score: ' + bestScore;

    let d = document.getElementById('dino');
    d.innerHTML = 'Dino: ' + (deadDinos.length + 1);

    if(obstacles.length > 1){
        dino.dinoThink();
    }
    dino.dinoMove();
    dino.dinoDraw();

    if(frameCount > timeWas + timer && timer != 0) {
        timeWas = frameCount;
        timer = random(5, 15);
        obstacles.push(new Obstacle());
    }

    for (i = 0; i < obstacles.length; i++) {
        if(!obstacles[i].hits()){
            obstacles[i].update();
            if(obstacles[i].x < -20)
                obstacles.splice(0, 1);
        }else{
            if(runBestDino){
                reset();
            }else{
                deadDinos.push(dino);
                if(deadDinos.length < DINOS){
                    count += 1;
                    reset();
                }else{
                    livingDinos = [];
                    nextGeneration();
                    reset();
                }
            }
        }
    }   
}

function createDinos(){
    for(let i = 0; i < DINOS; i++){
        livingDinos[i] = new Dino();
    }
}

function reset(){
    frameCount = 0;
    timer = 10;
    timeWas = 0;
    obstacles = [];
}

function runBest(){
    generation = 0;
    reset();
    runBestDino = true;
}

function train(){
    generation = 0;
    reset();
    runBestDino = true;
    createDinos();
}
