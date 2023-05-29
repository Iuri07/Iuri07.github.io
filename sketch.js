let resolution = 100;
let circle_color;
let t = 0;
let speed = 0.008
let strength = 20


function getNoise(t,angle){
    return(map(noise(t+cos(angle)/100, t+sin(angle)/100),0,1,-strength,strength))
}

function drawCircle(radius, color, resolution, t){
    strokeWeight(5);
    noFill();
    step = 360/resolution
    stroke(color);
    let i = 0

    beginShape()
    let first_anchor=null
    for (let angle = 0; i <= resolution+1; angle+=step){
        let anchor = null

        if(resolution==i){
            angle=0
        }
        anchor = createVector((radius+noise(t,angle)*strength)*cos(angle), (radius+noise(t,angle)*strength)*sin(angle))

        if(angle==0){
            first_anchor = anchor
        }

        curveVertex(anchor.x, anchor.y)   
        i+=1
    }
    curveVertex(first_anchor.x, first_anchor.y)
    endShape()
}

function mouseClicked(){
    resolution+=1
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw(){
    radius = Math.min(width, height) / 2 - 50;

    blendMode(BLEND)
    background(20);

    colorMode(RGB, 255, 255, 255, 1);
    blendMode(SCREEN);
    noFill();
    translate(width / 2, height / 2);

    rotate(t*3)
    circle_color = color(255, 0, 0, .7);
    translate(0, 0)
    drawCircle(radius, circle_color, resolution, t);
    rotate(TWO_PI / 3+t)
    circle_color = color(0, 255, 0, .7);
    drawCircle(radius, circle_color, resolution, t+1)

    rotate(TWO_PI / 3-t)
    circle_color = color(0, 0, 255, .7);
    drawCircle(radius, circle_color, resolution, t+2)
    
    t += speed

}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
