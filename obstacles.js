var pixSize = 20;

class Obstacle {

    constructor() {
        this.x = 800;
        this.y = 330;
    }

    show() {
        fill(255, 0, 0);
        stroke(255, 0, 0);
        rect(this.x, this.y, pixSize, pixSize);
    }

    update() {
        this.x = this.x - 20;
        this.show();
    }

    hits() {
        if((this.x >= dino.x + 20 && this.x <= dino.x + 20)){
            if(this.y <= dino.y){
                return true;
            }
            return false;
        }
        return false;
    }
  
  }