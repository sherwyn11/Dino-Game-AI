class Dino {

    constructor(brain){
        this.x = 60;
        this.y = 330;
        this.lift = -15;
        this.gravity = 2;
        this.velocity = 0;
        this.score = 0;
        this.fitness = 0;
        if(brain instanceof NeuralNetwork){
            this.brain = brain.copy();
        }else{
            this.brain = new NeuralNetwork(4, 8, 2);
        }
    }

    dinoThink(){
        let difference = Infinity;
        let distance = 0;

        let newClosestObstacle;
        let newNextObstacle;

        for(let i = 0; i < obstacles.length; i++){
            distance = obstacles[i].x - this.x + 20;
            if(distance < difference && distance > 0){
                newClosestObstacle = obstacles[i];
                newNextObstacle = obstacles[i + 1];
                difference = distance;
            }
        }

        if(newClosestObstacle != null && newNextObstacle != null){
            let inputs = [];
            
            inputs[0] = map(newClosestObstacle.x, this.x, width, 0 , 1);
            inputs[1] = map(newClosestObstacle.x + 20, this.x, width, 0, 1);
            inputs[2] = map(newNextObstacle.x, this.x, width, 0, 1);
            inputs[3] = map(newNextObstacle.x + 20, this.x, width, 0, 1);

            let output = this.brain.predict(inputs);
            if(output[1] < output[0] && this.y == 330){
                this.dinoJump();
            }
        }
    }

    copy(){
        return new Dino(this.brain);
    }

    dinoMutate(rate){
        this.brain.mutate(rate);
    }

    dinoDispose(){
        this.brain.dispose();
    }

    dinoJump(){
        this.velocity += this.lift;
    }

    dinoMove(){
        this.velocity += this.gravity;
        this.y += this.velocity;
        if(this.y >= 330){
            this.y = 330;
            this.velocity = 0;
        }
        this.score = frameCount;
    }

    dinoDraw(){
        fill(255);
        rect(this.x, this.y, 20, 20);
    }

}