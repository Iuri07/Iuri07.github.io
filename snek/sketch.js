let commodoreFont;
let dir = [1,0];

function preload() {
  commodoreFont = loadFont('fonts/Commodore\ Angled\ v1.2.ttf');
}

function drawScreen(pause_state, snake_state){
  if(pause_state){
      rectMode(RADIUS);
      strokeWeight(2);
      stroke(255);
      fill(30);
      rect(windowWidth/2, windowHeight/2, windowWidth*0.2, windowHeight*0.15, 3);
      fill(255)
      noStroke();
      textFont(commodoreFont);
      textAlign(CENTER);

    //START SCREEN
    if(snake_state == 'idle'){
      textSize(32)
      text('SNEK', windowWidth/2, windowHeight/2-30);
      textSize(16)
      text('', windowWidth/2, windowHeight/2);
      text('Press \'SPACE\' to START.', windowWidth/2, windowHeight/2+30);
      textSize(14)
      text('v1.0', windowWidth*0.34, windowHeight*0.62);
      text('- Iuro07', windowWidth*0.65, windowHeight*0.62);
    }
    // DEATH SCREEN
    //START SCREEN
    if(snake_state == 'dead'){
      textSize(32)
      text('YOU DIED', windowWidth/2, windowHeight/2-30);
      textSize(16)
      text('Press \'SPACE\' to try again.', windowWidth/2, windowHeight/2+60);
    }

    //PAUSED SCREEN
    if(snake_state == 'playing'){
      textSize(32)
      text('PAUSED', windowWidth/2, windowHeight/2-30);
      textSize(16)
      text('Press \'SPACE\' to unpause.', windowWidth/2, windowHeight/2+60);
    }
  }
}

function setup(){
  const res = 15;
  canvas = createCanvas(windowWidth, windowHeight);
  snek = new Snek(res);
  food = new Food(res);
  // frameRate(12);
}

function draw() {
  background(43, 55, 77);
  snek.update();
  food.show();
  snek.show();
  snek.eat(food);
  drawScreen(snek.pause_state, snek.state);
}

function keyPressed(){
  switch(keyCode){
    case UP_ARROW:
      dir = [0,1];
      break;
    case DOWN_ARROW:
      dir= [0,-1];
      break;
    case LEFT_ARROW:
      dir = [-1,0];
      break;
    case RIGHT_ARROW:
      dir = [1,0];
      break;
    case 32:
      snek.pause()
    break;
  }
}
