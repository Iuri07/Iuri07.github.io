let c;
let t = 0;
let r;
let speed = 0.02

function drawCircle( max_r, color, t ) {
  beginShape();
  strokeWeight( 5 );
  noFill();
  stroke( color );
  for ( let angle = 0; angle < TWO_PI; angle += 0.05 ) {
    let off = cos(angle+t*1.5);
    let r = map( off, 0, 1, max_r * .99, max_r );
    let circle_x = r * cos( angle );
    let circle_y = r * sin( angle );
    vertex( circle_x, circle_y );
  }
  endShape( CLOSE );
}

function setup() {
  createCanvas( windowWidth, windowHeight );

}

function draw() {
  r = Math.min( width, height ) / 2 - 50;

  blendMode( BLEND )
  background( 20 );

  colorMode( RGB, 255, 255, 255, 1 );
  blendMode( SCREEN );
  noFill();
  translate( width / 2, height / 2 );

  c = color( 255, 0, 0, .7 );
  translate( 0, 0 )
  drawCircle( r, c, t );

  rotate( PI / 3 )
  c = color( 0, 255, 0, .7 );
  drawCircle( r, c, t );

  rotate( PI / 3 )
  c = color( 0, 0, 255, .7 );
  drawCircle( r, c, t );

  t += speed

}

function windowResized() {
  resizeCanvas( windowWidth, windowHeight );
}
