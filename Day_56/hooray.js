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
		confetti =[],
		squares =[],
		spent = [],
		sound = true,
	    mouse;


	    ctx.canvas.height = h,
		ctx.canvas.width = w,

	$('#rope_container').draggable({
		containment: "parent",
		start: function(e){
          mouse = e.pageY;
		},
		stop: function(){
			
				$('#message').fadeOut('slow');
				init();
				playSound();
		   
			animateRope();
		}

	});


drawScreen();

$('#sound_btn').on('click', function () {
		if (sound) {
			$('button').addClass('off');
			$('button').removeClass('on');
			$('button').text('Sound Off');
		} else {
			$('button').addClass('on');
			$('button').removeClass('off');
			$('button').text('Sound On');
		}

		sound = !sound;
	});

function init(){
	for(i=0; i < 600; i++){
		confetti.push(new Confetti());
	}
	//for(j=0; j <300; j++){
		//squares.push(new Square());
	//}
			
};

function animateRope(){
  	$('#rope_container').animate({top:0}, 100);
};

function Confetti(){
	var shapes =['square','circle'];

	this.speed = Math.random() * 7 + 3 ;
  	this.size = randomInt(1, 8);
  	this.xPos = randomInt(10, w-10);
	this.yPos = -100;
  	this.color = randomColor();
  	this.shape = shapes[Math.floor(Math.random() * 2)];
  	
};

function drawScreen(){
	ctx.clearRect(0, 0, w, h);

	drawConfetti();
	drawSpent();
	evolveConfetti(confetti);
	

   setTimeout(drawScreen, 20);
};

function drawConfetti() {
		_.each(confetti, function (piece) {
			if (piece.shape == 'circle') {
				makeCircles(piece);
			} else if (piece.shape == 'square') {
				makeSquares(piece);
			}
		});
	};


function makeCircles(c){

		ctx.fillStyle = c.color;
		ctx.beginPath();
		ctx.arc(c.xPos, c.yPos, c.size, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		
};


function makeSquares(square){
		ctx.fillStyle = square.color;
		ctx.beginPath();
		ctx.rect(square.xPos, square.yPos, square.size, square.size);
		ctx.fill();
};

function drawSpent(){
	_.each(spent, function(piece){
		if(piece.shape == 'circle'){
			makeCircles(piece);
		} else if (piece.shape == 'square'){
			makeSquares(piece);
		}
	});

	if (spent.length > 800){
		spent.splice(0, spent.length - 800);
	}
};

function evolveConfetti(array){
	_.each(array, function(item, i){
		item.yPos += item.speed;

		if(item.yPos >= h - item.size){
			item.yPos = h - item.size;
			spent.push(item);
			array.splice(i, 1);
		}
	});
};


function playSound() {
		if (sound) {
  			$('#sound').html("<audio autoplay><source src='audio/yay.mp3' type='audio/mp3'></audio>");
		}
	};


 $('body').disableSelection();

});

function randomColor(){
	return '#' + Math.random().toString(16).slice(2, 8);
}

function randomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
 };