(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function(){

 	var canvas = document.getElementById('canvas'),
 		ctx = canvas.getContext('2d'),
 		h = window.innerHeight,
 		w = window.innerWidth,
 		stars = [],
 		invaders = [],
 		bullets =[],
 		ship_x = 0,
 		ship_y = 0,
 		ship_speed = 0.5,
 		mouse = {
			x: 0,
			y: 0
		},
 		score = 0;

 		ctx.canvas.height = h;
 		ctx.canvas.width = w;

 		var play = setInterval(drawScreen, 20);

 		$('#info').fadeOut(8000);

    	init();

    	setInterval(function(){
		 moveInvaders(randomInt(w + 10, w + 100), randomInt(100, h-100));
	 },5000);

		function drawScreen(){

		ctx.clearRect(0, 0, w, h);

		drawInvaders();
		drawShip();
		drawStar();	
		drawBullets();
		checkCollision();

		}; 	

		function init(){
			for(i=0; i<250; i++){
				moveStars(randomInt(0, w + 100), randomInt(0, h));
			}

			for(j=0; j<5; j++){
				 moveInvaders(randomInt(w + 10, w + 500), randomInt(100, h-100));
			}

		};

 		 function Star(x,y){
 		 	this.x = x;
 		 	this.y = y;
 		 	this.radius = randomInt(0.1, 2);
 		 	this.speed = randomInt(0.2, 4);
 		 };

 		 function Invader(x,y){
 		 	this.x = x;
 		 	this.y = y;
 		 	this.speed = 4;
 		 };

 		 function Bullet(){
 		 	this.x = ship_x + 40;
 		 	this.y = ship_y + 20;
 		 	this.speed = 15;
 		 };

 		 $('#canvas').on('mousemove',function(e){
 		 	e.preventDefault();

 		 	mouse.x = e.clientX;
 		 	mouse.y = e.clientY;
 		 });


 		function drawInvaders(){
 			_.each(invaders, function(invader, i){
 			ctx.fillStyle = "#D66E05";
 			ctx.beginPath();
 			ctx.moveTo(invader.x, invader.y);
 			ctx.lineTo(invader.x - 25, invader.y + 10);
 			ctx.lineTo(invader.x , invader.y + 20 );
 			ctx.lineTo(invader.x - 6, invader.y + 11);
 			ctx.closePath();
 			ctx.fill();

 			evolveInvaders(invader, i);

 			});
 		};

 		function drawShip(){
 			ship_x += (mouse.x - ship_x) / 20;
 			ship_y += (mouse.y - ship_y) / 5;

 			ctx.fillStyle = "#A2A1AB";
 			ctx.beginPath();
 			ctx.moveTo(ship_x, ship_y);
 			ctx.lineTo(ship_x + 40, ship_y + 20);
 			ctx.lineTo(ship_x, ship_y + 40);
 			ctx.lineTo(ship_x - 15, ship_y + 20);
 			ctx.closePath();
 			ctx.fill();            

 		};

 		function drawStar(){
 			_.each(stars, function(star, i){
	 			ctx.fillStyle = "#eee";
	 			ctx.beginPath();
	 			ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
	 			ctx.closePath();
	 			ctx.fill();

	 			evolveStars(star, i);
 			});
 		};

 		function drawBullets(){
 			_.each(bullets, function(bullet, i){
 				ctx.fillStyle = "red";
 				ctx.beginPath();
 				ctx.rect(bullet.x, bullet.y, 25, 2);
 				ctx.closePath();
 				ctx.fill();

	  			evolveBullets(bullet, i);
 			});
 		};

 		function evolveStars(star, i){
 			star.x -= star.speed;

 			if(star.x < 0){
 				star.x = w + 100;
 			}
 		};

 		function evolveInvaders(invader, i){
 			invader.x -= invader.speed;

 			if(invader.x < 0){
 				invader.x = w + 100;
 			}
 		};

 		function evolveBullets(bullet,i){
 			bullet.x += bullet.speed;

 			if(bullet.x > w){
 				bullets.splice(i, 1);
 			}
 		};

 		function moveStars(x,y){
 			stars.push(new Star(x,y));
 		};

 		function moveInvaders(x,y){
 			invaders.push(new Invader(x,y));
 			
 		};

 		function checkCollision(){
 			_.each(bullets, function(bullet, i){
 			   _.each(invaders, function(invader, j){
		  		    if ( bullet.x < invader.x && bullet.x + 30 > invader.x ){
		  					if (bullet.y - 25 < invader.y && bullet.y + 25 > invader.y){
		  						score += 100;
		  						invaders[j] = new Invader();
		  						bullets[i] = new Bullet();

		  						moveInvaders(randomInt(w + 10, w + 500), randomInt(100, h-100));

		  						if (score % 500 == 0){
		  							invader.speed *= 1.1;
		  						}

		  						ctx.beginPath();
						        ctx.fillStyle = 'rgba(199,40,26, 0.95)';
						        ctx.arc(invader.x - 5, bullet.y, 40, 0, 2 * Math.PI);
								ctx.fill();
								ctx.closePath();	  	  						
		  					}
	  				} 
	  			});
                   $('#score').text('Score : ' + score);

 			});

 			_.each(invaders, function(invader, j){
 				if (invader.x  <= ship_x + 40 && invader.x  >= ship_x - 15 && invader.y  <= ship_y + 40 && invader.y >= ship_y ){
 					
 						clearInterval(play);

 						ctx.beginPath();
						ctx.fillStyle = 'rgba(199,40,26, 0.95)';
						ctx.arc(invader.x - 5, ship_y, 40, 0, 2 * Math.PI);
					    ctx.fill();
					    ctx.closePath();

					    ctx.beginPath();
						ctx.fillStyle = 'rgba(199,40,26, 0.75)';
						ctx.arc(invader.x - 5, ship_y, 60, 0, 2 * Math.PI);
					    ctx.fill();
					    ctx.closePath();

					    ctx.beginPath();
						ctx.fillStyle = 'rgba(199,40,26, 0.55)';
						ctx.arc(invader.x - 5, ship_y, 80, 0, 2 * Math.PI);
					    ctx.fill();
					    ctx.closePath();

					    ctx.beginPath();
						ctx.fillStyle = 'rgba(199,40,26, 0.35)';
						ctx.arc(invader.x - 5, ship_y, 100, 0, 2 * Math.PI);
					    ctx.fill();
					    ctx.closePath();

					    ctx.beginPath();
						ctx.fillStyle = 'rgba(199,40,26, 0.15)';
						ctx.arc(invader.x - 5, ship_y, 120, 0, 2 * Math.PI);
					    ctx.fill();
					    ctx.closePath();

					    $('#game_over').show();
				} 		
 			});

 		};


 		$('#canvas').on('click',function(e){

 			bullets.push(new Bullet());
        });     


 		$('body').disableSelection();

});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};



