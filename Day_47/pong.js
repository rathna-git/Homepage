$(document).ready(function(){

var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');

var h = canvas.height,
	w = canvas.width,
	x = canvas.width/2,
	y = canvas.height - 30,
	dx = 2,
	dy = -2,
	ballRadius = 10,
	id,
	ypos =  0,
	score = 0,
	speed = 10;

var brickRowCount = 3;
var brickColumnCount = 6;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 40;

// Paddles intialize
ctx.fillStyle = "#33cc33";
ctx.fillRect(0,180,12,80);

ctx.fillStyle = "#33cc33";
ctx.fillRect(538,180,12,80);


var bricks = [];
for (c = 0; c < brickColumnCount; c++){
	bricks[c] = [];
	for (r = 0; r < brickRowCount; r++){
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}	
}

$('canvas').mousemove(function(e){	 
	 yPos1 = e.pageY-canvas.offsetTop;
	 yPos2 = e.pageY-canvas.offsetTop;

   });

function drawBricks(){
	for (c = 0; c < brickColumnCount; c++){
		for(r=0; r < brickRowCount; r++){
		  if(bricks[c][r].status == 1){	
				var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = '#0000ff';
				ctx.fill();
				ctx.closePath();
		    }
		}
	}
}

function drawPaddle(){

	ctx.beginPath();
    ctx.fillStyle = "#33cc33";
    ctx.fillRect(0, yPos1, 12, 80);
    ctx.closePath();

    ctx.beginPath();
	ctx.fillStyle = "#33cc33";
    ctx.fillRect(538, yPos2 , 12, 80);
    ctx.closePath();
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();
}

function draw(){
	ctx.clearRect(0, 0, w, h);
	drawBricks();
	drawBall();
	drawPaddle();

    brickCollision();
	checkCollision();
}
function checkCollision() {

	var collision = false;

	if( (x + dx) <=  22) {
		if (y > yPos1 && y < yPos1 + 80) {
			collision = true;
        }
	} else if( (x + dx) >= (w - 22)){
    	if(y > yPos2 && y < (yPos2 + 80)){
   
    		collision = true;

    	}
    }
           if(collision){
    		dx = -dx;
    	}	
		
    	 if (x < -ballRadius || x > w + ballRadius ) {
				clearInterval(id);
				$('#game_over').show();
    		 }  	
    	

   if((y + dy) > h-ballRadius || (y + dy) < ballRadius) {
	       
	    dy = -dy;
	 }

	x += dx;
	y += dy;

}

function brickCollision(){
	for( c = 0; c < brickColumnCount; c++) {
		for(r= 0; r < brickRowCount; r++){
			var b = bricks[c][r];
			if(b.status == 1){
				if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
					dy = -dy;
					b.status = 0;
					score++;
					$('#score').text('Score: ' + score);
					if(score == brickRowCount * brickColumnCount){
						$('#win').show();
						clearInterval(id);
					}
				    if (score % 4 == 0) {
						clearInterval(id);
						speed -- ;
						id = setInterval(draw, speed);
					}
				}	
			}
		}
	}
}


$('#start_btn').on('click', function(){

	$('#info').hide();	
    id = setInterval(draw, speed);
    
});

	

});





















