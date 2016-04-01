$(document).ready(function(){
  	var canvas = document.getElementById('canvas'),
  	  	ctx = canvas.getContext('2d'),
  	  	h = canvas.height,
  	  	w = canvas.width,
  	  	circles = [],
  	  	bullets = [],
  	  	tankX = w/2,
		tankY = h-40,
  	  	lives = 3;
  	  	score = 0,
  	  	color = ['#ff3399','#66ff33','#ffff00','#0099ff','#ff6666','#00ff00','#ff6600','#ffff66','#cc00cc',
  						 '#00ffff','#ffffff','#ccff99','#c6ff1a','#ffb3ec','#b33c00'];

  
  	$('#close').on('click',function(){
 		$('#begin').hide();
 		$('#stats_container').show();
 		$('#canvas').show();
 		setTimeout(function(){
 			init();
 		},2000)		
 	});
  

function init(){

	for (var i = 0; i < 5; i++) 
	   circles.push(new Circle());
      
       setInterval(function(){
		for (var i = 0; i < 2; i++) 
			circles.push(new Circle());
		},20000);

	drawScreen();				
	};	


  	function Circle(){
  		this.speed = Math.random();
  		this.size = 10;
  		this.xPos = randomInt(20, w-20);
  		this.yPos = 10;
  		this.color = color[Math.floor(Math.random() * 15)];
  	};


  	function makeCircles(){
  	
  		_.each(circles, function(c, i){
  			
  			ctx.fillStyle = c.color;
  			ctx.beginPath();
  			ctx.arc(c.xPos, c.yPos, c.size, 0, Math.PI * 2);
  			ctx.fill();

  			c.yPos += c.speed;

  			if(c.yPos >= h-50){
  				circles[i] = new Circle();
  				lives--;			
  			}
  		});
  	}

	function drawTank(){
	  		
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.rect(tankX, tankY, 30, 30);
		ctx.closePath();
		ctx.fill();

	}

  	function Bullet(){
  		this.shotX = tankX + 15,
  		this.shotY = h - 50,
  		this.speed= -3;
  	}

  	function drawBullets(){
  		_.each(bullets, function(b,i) {
  			if (b.shotY > 20) {
	  			ctx.fillStyle = "red";
	  			ctx.beginPath();
	  			ctx.rect(b.shotX, b.shotY, 3, 5);
	  			ctx.closePath();
				ctx.fill();

	  			_.each(circles, function(c, j){
	  				if ( b.shotX < c.xPos + c.size && b.shotX > c.xPos - c.size){
	  					if (b.shotY <= c.yPos + c.size){
	  						score++;
	  						circles[j] = new Circle();
	  					
	  						
	  					}
  				} 
  			});

  			 b.shotY += b.speed;
  			}
  		});
  		
  	}
	
 	function drawScreen(){
 		ctx.clearRect(0,0,w,h);
 		drawTank();
 		makeCircles();
 		drawBullets();

 		$('#lives').text('LIVES : '+ lives);
 		$('#score').text('SCORE : '+ score);

 		if(lives==0){
	 			$('#game_over').show();
 			} else {
 			setTimeout(drawScreen,20);
 			
 		}

 	}

 	$(document).on('keydown',function(e){

 		if(e.keyCode == 32){

 			bullets.push(new Bullet());

 		} else if(e.keyCode == 37){
 			tankX -= 20;

 			if(tankX < 10){
 				tankX = 10;
 			}
 		} else if(e.keyCode == 39){
 			tankX += 20;

 			if(tankX > w-40){
 				tankX = w-40;
 			}
 		}
 	});

 

});
function randomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
 };