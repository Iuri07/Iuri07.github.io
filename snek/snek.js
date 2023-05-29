class Snek{
    constructor(resolution = 14){
        this.resolution = resolution;
        this.body = [createVector(0,0)]
        this.size = 1*resolution;
        this.x_speed = 1*resolution;
        this.y_speed = -1*resolution;
        this.dir = createVector(1,0);
        this.pause_state = true;
        this.state = 'idle';

    }

    pause(override){
        override ? this.pause_state = true : this.pause_state = !this.pause_state;
        this.state = 'playing';
    }

    changeDir(x_dir, y_dir){
        if((x_dir*this.dir.x == 0 && y_dir*this.dir.y == 0) && !this.pause_state){
            this.dir.x = x_dir;
            this.dir.y = y_dir;
        }
    }

    eat(food){
        if(this.body[0].x == food.position.x && this.body[0].y == food.position.y){
            food.replace();
            this.body.push(createVector(this.body[0].x, this.body[0].y))
        }
    }

    update(){
      if(!this.pause_state && frameCount%4 == 3){
          this.changeDir(dir[0], dir[1]);
          var next_pos = createVector(this.body[0].x + this.x_speed*this.dir.x, this.body[0].y + this.y_speed*this.dir.y);
          var ww = floor(windowWidth/this.resolution)*this.resolution;
          var wh = floor(windowHeight/this.resolution)*this.resolution
          if(next_pos.x < 0){
              next_pos.x = ww;
          }
          else if(next_pos.x > ww){
              next_pos.x = 0;
          }
          else if(next_pos.y < 0){
              next_pos.y = wh;
          }
          else if(next_pos.y > wh){
              next_pos.y = 0;
          }
          if(this.body.length > 1){
              this.body.pop();+
              this.body.unshift(next_pos);
          }else{
              this.body[0].x = next_pos.x;
              this.body[0].y = next_pos.y;
          }
          snek.death();
      }
    }

    show(){
        rectMode(CORNER);
        fill(51, 153, 102);
        noStroke();
        for(var i = 0; i < this.body.length; i++){
            rect(this.body[i].x, this.body[i].y, this.size, this.size, 3);
        }

    }

    death(){
        if(abs(this.dir.x) > 0 || abs(this.dir.y) > 0){
            for(var i = 1; i < this.body.length; i++){
                if(dist(this.body[i].x,this.body[i].y, this.body[0].x, this.body[0].y) < 1){
                    this.pause(true);
                    this.body = [createVector(0,0)];
                    this.state = 'dead';
                }
            }
        }
    }
}

class Food{
    constructor(resolution){
        this.resolution = resolution;
        this.position = createVector(floor(random(windowWidth)/resolution)*resolution,floor(random(windowHeight)/resolution)*resolution);
        this.size = 1*resolution;
    }

    show(){
        rectMode(CORNER)
        fill(237,34,93);
        noStroke();
        rect(this.position.x, this.position.y, this.size, this.size, 6);
        fill(0, 204, 102)
        translate(this.position.x + floor(this.size/2) + 1, this.position.y -1);
        rotate(PI / 3.0);
        ellipse(0, 0, 3, 8);
        rotate(-PI / 3.0);
        translate(-this.position.x - floor(this.size/2) -1, -this.position.y +1);
    }

    replace(){
        this.position = createVector(floor(random(this.resolution, windowWidth)/this.resolution - 1)*this.resolution,floor(random(this.resolution, windowHeight)/this.resolution - 1)*this.resolution);
    }
}
