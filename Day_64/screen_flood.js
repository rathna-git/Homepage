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
		drops = [],
		wtr_lvl = h-5;

		ctx.canvas.height = h - 1;
		ctx.canvas.width = w;

	setInterval(drawScreen, 30);	

    $('#canvas').on('click',function(e){
    	var x = e.pageX,
    		y = e.pageY;

    		makeRain(x,y);

    });

    $('#rain_btn').on('click',function(){
    	for (i=0; i < 100; i++){
    		makeRain(randomInt(0, w), -1 * randomInt(15,500));
    	}
    });

    function drawScreen(){
    	ctx.clearRect(0, 0, w, h);
    	drawRain();
    	drawWater();
    };

    function Drop(x,y){
    	this.x = x;
    	this.y = y;
    	this.speed = 3;
    	this.radius = 5;
    };

    function makeRain(x,y){
    	drops.push(new Drop(x,y));
    };

    function drawRain(){
    	_.each(drops, function(drop,i){
    	ctx.fillStyle = '#0099ff';
			ctx.beginPath();
			ctx.arc(drop.x, drop.y, drop.radius, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(drop.x + drop.radius*Math.cos(11*Math.PI/6), drop.y + drop.radius*Math.sin(11*Math.PI/6));
			ctx.lineTo(drop.x, drop.y - drop.radius * 1.7);
			ctx.lineTo(drop.x + drop.radius*Math.cos(7*Math.PI/6), drop.y + drop.radius*Math.sin(7*Math.PI/6));
			ctx.closePath();
			ctx.fill();

			evolveDrop(drop, i)
		});
    };
     
    function evolveDrop(drop, i){
    	drop.y += drop.speed;

    	if(drop.y > wtr_lvl + drop.radius * 2){
    		drops.splice(i, 1);
    		wtr_lvl -= 0.25;
    	}
    };

    function drawWater(){

    	if (wtr_lvl > 60){
    		ctx.fillStyle = '#0099ff';
    		ctx.fillRect(0, wtr_lvl, w, h);

    	} else {
    		wtr_lvl = 60;
    		ctx.fillStyle = '#0099ff';
    		ctx.fillRect(0, 60, w, h);
    		$('#rain_btn').off().css({
    			'background': 'gray',
    			'cursor': 'auto'
    		});
    	}
    	moveDucky();
    };

    function moveDucky(){
    	$('#ducky').css('top', wtr_lvl - 34);
    };

  $('body').disableSelection();

});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};