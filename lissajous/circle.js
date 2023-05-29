class Circle{
  constructor(center, diameter, speed, color, type, end){
    this.center = center;
    this.speed = speed;
    this.color = color;
    this.diameter = diameter;
    this.type = type;
    this.end = end;
    this.angle = 0;
    this.orbit = createVector(0,0);
  }
  update(){
    let radius = this.diameter/2;
    this.orbit.x = this.center.x + radius*cos(this.angle);
    this.orbit.y = this.center.y + radius*sin(this.angle);
    this.angle += this.speed;
  }
  show(){
    stroke(this.color || 255);
    strokeWeight(1);
    noFill();
    ellipse(this.center.x, this.center.y, this.diameter);

    stroke(255);
    strokeWeight(4);
    point(this.orbit.x, this.orbit.y)

    strokeWeight(1);
    stroke(255, 25);
    if(this.type == 'horizontal'){
      line(this.orbit.x, this.orbit.y, this.orbit.x, this.end)
    } else{
      line(this.orbit.x, this.orbit.y, this.end, this.orbit.y)
    }
  }
}

class Curve {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vertex = [];
    this.color = color;
  }

  update(x, y){
    if( !this.vertex[0] || this.vertex.length < 500){
      this.vertex.push(createVector(x, y));
    }
    this.x = x;
    this.y = y;
  }

  show(){
    stroke(this.color || 255);
    strokeWeight(1);
    beginShape();
    for(i = 0; i< this.vertex.length; i++){
      vertex(this.vertex[i].x, this.vertex[i].y);
    }
    endShape()
    stroke(255);
    strokeWeight(4);
    point(this.x, this.y);
  }
}
