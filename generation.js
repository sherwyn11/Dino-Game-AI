var bestFitness = 0;

function nextGeneration(){
    generation += 1;

    calculateFitness();

    for(let i = 0; i < DINOS; i++){
        livingDinos[i] = pickBest();
    }
    deadDinos = [];
}


function calculateFitness(){
    var sum = 0;

    for(let i = 0; i < deadDinos.length; i++){
        sum += deadDinos[i].score;
    }
    for(i = 0; i < deadDinos.length; i++){
        deadDinos[i].fitness = deadDinos[i].score / sum;
    }
}

function pickBest(){
    var index = 0;
    let child;
    let curr = 0;

    for(let i = 0; i < deadDinos.length; i++){
        if(curr < deadDinos[i].fitness){
            curr = deadDinos[i].fitness;
            index = i;
        }
    }
    let tempDino = deadDinos[index];

    console.log('Best fitness of the generation ', tempDino.fitness);
    
    if(bestFitness < tempDino.fitness){
        bestFitness = tempDino.fitness;
        bestScore = tempDino.score;
        bestDino = tempDino;
    }

    child = new Dino(tempDino.brain);
    child.dinoMutate(0.1);
    return child;
}