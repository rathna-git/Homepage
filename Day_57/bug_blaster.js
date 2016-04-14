(function($){
	$.fn.disableSelection = function() {
		return this
					.attr('unselectable','on')
					.css('user-select','none')
					.on('selectstart','false')

	};
})(jQuery);

$(document).ready(function(){

var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	h = window.innerHeight - 40,
	w = window.innerWidth,
	bugs = [],
	balls = [],
	acceleration = 0.0001,
	time_interval = 30,
	level = 1,
	bullets = 20,
	curAngle = 45,
	cannon = {
		angle: degToRad(curAngle),
		xPos: 50,
		yPos: h - 70,
		power: 0.4,
	},

	levels = [
	{
		num_bugs: 3,
		bullets:20,
	},{
		num_bugs: 3,
		bullets: 20,

	},{
		num_bugs: 5,
		bullets: 20,
	},{
		num_bugs:8,
		bullets: 20,
	},{
		num_bugs: 5,
		bullets:15,
	},{
		num_bugs:3,
		bullets:15
	},{
		num_bugs:3,
		bullets:10,
	},{
		num_bugs:5,
		bullets: 10,
	},{
		num_bugs:3,
		bullets:10,
	},{
		num_bugs:3,
		bullets:10,
	},{
		num_bugs:3,
		bullets:5,
	}];

	ctx.canvas.height = h;
	ctx.canvas.width = w;


 function drawScreen(){
	  	ctx.clearRect(0,0,w,h);

	  	drawCannon();
	  	drawBalls();
	  	drawBug();
	  	checkCollision();
	  	updateStats();

	  	setTimeout(drawScreen,20);
  }
 
	function degToRad(deg){
		return deg * Math.PI / 180;
	}

	function updateCannon(){
		cannon.x = 80 * Math.sin(cannon.angle);
		cannon.y = 80 * Math.cos(cannon.angle);
	}

	function Bug(){
		this.x = randomInt(200, w-50);
		this.y = randomInt(20, h-100);
	}

	function drawBug(){
		_.each(bugs,function(b){
			
			ctx.beginPath();
			ctx.fillStyle = "black";
			ctx.arc(b.x, b.y, 20, 0, Math.PI * 2);
			ctx.fill();
		    ctx.lineWidth = 3;
		    //right side arms
		    ctx.moveTo(b.x + 6, b.y - 8);
		    ctx.lineTo(b.x + 35, b.y - 20);
		    ctx.moveTo(b.x + 6, b.y );
		    ctx.lineTo(b.x + 40, b.y );
		    ctx.moveTo(b.x + 5, b.y + 5);
		    ctx.lineTo(b.x + 35 , b.y + 15);
		    //left side arms
		    ctx.moveTo(b.x - 6, b.y - 8);
		    ctx.lineTo(b.x - 35, b.y - 20);
		    ctx.moveTo(b.x - 6, b.y );
		    ctx.lineTo(b.x - 40, b.y );
		    ctx.moveTo(b.x - 5,b.y + 5);
		    ctx.lineTo(b.x - 35 , b.y + 15);
		    ctx.strokeStyle = 'black'
 	 		ctx.stroke();
 	 		//eyes
		    ctx.moveTo(b.x - 6, b.y + 3 );
		    ctx.beginPath();
		    ctx.fillStyle = "white";
		    ctx.arc(b.x - 6, b.y + 8, 3, 0, Math.PI * 2);
		    ctx.fill();
		    ctx.moveTo(b.x + 6, b.y + 3);
		    ctx.arc(b.x + 6, b.y + 8, 3, 0, Math.PI * 2);
		    ctx.fill();

	 		ctx.closePath();
		});
	};

	function drawCannon(){

		ctx.beginPath();
		ctx.lineWidth = 40;
		ctx.moveTo(cannon.xPos, cannon.yPos);
		ctx.lineTo(cannon.xPos + cannon.x, cannon.yPos - cannon.y);
		ctx.strokeStyle = "#008080";
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = "#00cccc";
		ctx.arc(50, h-70, 20, 0, Math.PI * 2);
		ctx.fill();

		ctx.closePath();

		updateCannon();

	};

 	function Ball(x, y, angle, v0){
 		this.x = x;
 		this.y = y;
 		this.x0 = x;
 		this.y0 = y;
 		this.v0 = v0;
 		this.angle = angle;
 		this.time = 0;
 		this.r = 5;
 	};

 	function drawBalls(){
 		
 		_.each(balls, function(ball){

 			ctx.fillStyle = 'red';
 			ctx.beginPath();
 			ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2 );
 			ctx.fill();
 			ctx.closePath();
 		});
 		evolveBalls();
 	};

 	function evolveBalls(){
 		_.each(balls, function(ball, i){
 			var v0x = ball.v0 * Math.sin(ball.angle);
 			var v0y = ball.v0 * Math.cos(ball.angle);

 			ball.time += time_interval;

 			ball.x = ball.x0 + v0x * ball.time;
 			ball.y = ball.y0 - v0y * ball.time + acceleration * Math.pow(ball.time, 2);
           
 			if (ball.y > h + ball.r){
 				balls.splice(i, 1);
 			}
 		});
 	};

 	function checkCollision(){
 		_.each(balls,function(ball) {
 			_.each(bugs,function(bug, i){
	 			if (ball.x + ball.r >= bug.x - 20 && ball.x - ball.r <= bug.x + 20 && ball.y + ball.r >= bug.y - 20 && ball.y - ball.r <= bug.y + 20 ){
	 				bugs.splice(i,1);

	 				if(bugs.length == 0){
	 					if(level < 10){
	 						level++;

	 						setLevel();
	 						$('.level_up').text('Next Level: '+ level);
	 						$('.level').show();

	 						setTimeout(function(){
	 							$('.level').fadeOut('700');
	 						},800);
	 					} else {
	 						$('.win').show();
	 					}
	 				}
	 			}
 			});
 		});
        
 		if(bullets == 0 && bugs.length != 0 && balls.length == 0){
 			$('.game_over').show();
 		}	
 	};

 	function setLevel(){
 		for(i=0; i < levels[level].num_bugs; i++){
 			bugs.push(new Bug());
 		}
 		balls = [];
 		bullets = levels[level].bullets;
 	};
 	function updateStats(){
 		$('.level_stat').text('Level: ' + level);
 		$('.pwr_lvl').text('Power Level: '+ Math.round(cannon.power * 100));
 		$('.bullets').text('Bullets: '+ bullets);
 	};



 $('#start_btn').on('click',function(){
 	$('#info').fadeOut();
 	$('#stats_container').show();
 	setLevel();

 	 drawScreen();
 });



$(document).on('keydown',function(e){
	if(e.keyCode == 32){
		balls.push(new Ball(cannon.xPos + cannon.x, cannon.yPos - cannon.y, cannon.angle, cannon.power));
		bullets--;

	}else if(e.keyCode == 37){

		cannon.power -= 0.02;

		if(cannon.power <= 0){
			cannon.power = 0;
		}
	}else if (e.keyCode == 39){
		cannon.power += 0.02;

		if(cannon.power >= 1){
			cannon.power = 1;
		}

	}else if (e.keyCode == 38){
		cannon.angle -= degToRad(2);

	}else if (e.keyCode == 40){
		cannon.angle += degToRad(2);
	}

});

$('body').disableSelection();


});
function randomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
 };
