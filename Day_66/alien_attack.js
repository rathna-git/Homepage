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
 		stars=[];

 		ctx.canvas.height = h;
 		ctx.canvas.width = w;

 		setInterval(drawScreen, 30);

 		$('#info').fadeOut(8000);



function drawScreen(){

ctx.clearRect(0, 0, w, h);
//drawAlien();
//drawShip();
drawStar();	
} 	

function init(){
	for(i=0; i<250; i++){
		moveStars(randomInt(0, w + 100), randomInt(0, h));
	}
};

init();	


 		 function Star(x,y){
 		 	this.x = x;
 		 	this.y = y;
 		 	this.radius = randomInt(0.1, 2);
 		 	this.speed = randomInt(0.2, 3);
 		 };

 		function drawAlien(){
 			ctx.fillStyle = "#D66E05";
 			ctx.beginPath();
 			ctx.moveTo(200, 200);
 			ctx.lineTo(200 - 25, 200 + 10);
 			ctx.lineTo(200 , 200 + 20 );
 			ctx.lineTo(200 - 6, 200 + 11);
 			ctx.closePath();
 			ctx.fill();
 		};

 		function drawShip(){
 			ctx.fillStyle = "#777381";
 			ctx.beginPath();
 			ctx.moveTo(400, 400);
 			ctx.lineTo(400 + 40, 400 + 20);
 			ctx.lineTo(400, 400 + 40);
 			ctx.lineTo(400 - 15, 400 + 20);
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

 		function evolveStars(star, i){
 			star.x -= star.speed;

 			if(star.x < 0){
 				star.x = w + 100;
 			}
 		};

 		function moveStars(x,y){
 			stars.push(new Star(x,y));
 		}


 		$('body').disableSelection();

});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};