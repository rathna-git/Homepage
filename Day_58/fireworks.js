(function($){
	$.fn.disableSelection = function() {
		return this
					.attr('unselectable','on')
					.css('user-select','none')
					.on('selectstart','false')

	};
})(jQuery);

window.requestAnimFrame = (function(){
	return window.requestAnimationFrame       ||
		   window.webkitRequestAnimationFrame ||
		   window.mozRequestAnimationFrame    ||
		   window.oRequestAnimationFrame      ||
		   window.msRequestAnimationFrame     ||
		   function (callback){
		   	window.setTimeout(callback, 1000/60);
		   };
})();


$(document).ready(function(){
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');
		h = window.innerHeight-40,
		w = window.innerWidth,
		rockets =[],
		particles = [],
		time_interval = 10,
		acceleration = 0.0001;

		ctx.canvas.height = h;
		ctx.canvas.width = w;

	function drawScreen(){
		ctx.fillStyle='rgba(0,0,0,0.2)';
		ctx.fillRect(0,0,w,h);

		drawRockets();
		drawParticles();

		requestAnimFrame(drawScreen);

	};

	function Rocket(x,y){
		this.x0 = w/2;
		this.x = w/2;		
		this.xf = x;
		this.y0 = h;	
		this.y = h;
		this.yf = y;
		this.v = 10;
		this.vx;
		this.vy;
	};

	function drawRockets(){
		_.each(rockets,function(rocket,i){
			ctx.strokeStyle = 'orange';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(rocket.x0, rocket.y0);
			ctx.lineTo(rocket.x,rocket.y);
			ctx.stroke();
			ctx.closePath();

			rocket.x0 = rocket.x;
			rocket.y0 = rocket.y;

			rocket.x += rocket.vx;
			rocket.y += rocket.vy;

			checkRocket(rocket,i);
		});
	};

	function Particle(x,y,color,size){
		this.x = x;
		this.y = y;
		this.x0 = x;
		this.y0 = y;
		this.v0 = Math.random()/4;
		this.angle = Math.random() * (360 * Math.PI / 180);
		this.time = 0;
		this.r = size;
		this.color = color;

	}

	function drawParticles(){
		_.each(particles, function(p){
			ctx.fillStyle = p.color;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();
		});
		evolveParticles();
	};

	function evolveParticles(){
		_.each(particles,function(p){
			var v0x = p.v0 * Math.sin(p.angle);
			var v0y = p.v0 * Math.cos(p.angle);

			p.time += time_interval;

			p.x = p.x0 + v0x * p.time;
			p.y = p.y0 - v0y * p.time + acceleration * Math.pow(p.time, 2);

			if(p.y > h + p.r){
				particles.splice(p, 1);
			}
		});
	};


	function checkRocket(rocket, i){
		if(rocket.x_dif < 0){
			if(rocket.x < rocket.xf && rocket.y < rocket.yf){
				explodeRocket(rocket.x,rocket.y);
				rockets.splice(i, 1);
			}
		} else {
				if(rocket.x > rocket.xf && rocket.y < rocket.yf){
					explodeRocket(rocket.x,rocket.y);
					rockets.splice(i, 1);
				}
		}
	};

	function explodeRocket(x,y){
		var color ='hsl(' + randomInt(0,360) + ',100%, 65%)',
			num = randomInt(100,400);
		
		for (i=0; i < num; i++){
			var size = Math.random() * 1.8;
			particles.push(new Particle(x, y, color, size));
		}
	};



	$('canvas').on('click',function(e){
		var new_rocket = new Rocket(e.pageX, e.pageY);

		new_rocket['x_dif'] = new_rocket.xf - new_rocket.x0;
		new_rocket['y_dif'] = new_rocket.yf - new_rocket.y0;

		new_rocket['vx'] = (new_rocket.v * new_rocket.x_dif)/(Math.sqrt((Math.pow(new_rocket.x_dif, 2) + Math.pow(new_rocket.y_dif, 2))));
		new_rocket['vy'] = (new_rocket.v * new_rocket.y_dif)/(Math.sqrt((Math.pow(new_rocket.x_dif, 2) + Math.pow(new_rocket.y_dif, 2))));

		rockets.push(new_rocket);
	});

	drawScreen();

	$('body').disableSelection();


});

function randomInt(min,max){
	return Math.floor(Math.random() * (max - min + 1) + min);
};




















