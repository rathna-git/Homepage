(function($){
	$.fn.disableSelection = function(){
		return this
			.attr('unselectable', 'on')
			.css('user-select', 'none')
			.on('selectstart', 'false');
	};
})(jQuery);

$(document).ready(function(){

 var canvas =  document.getElementById('canvas'),
 	 ctx = canvas.getContext('2d'),
 	 height = window.innerHeight-40,
 	 width = window.innerWidth,
 	 time_interval = 30,
 	 troopers = [],
 	 troopers_left = 5,
 	 hits = 0,
 	 arms_up = true,
 	 acceleration = 0.0001,
 	 level = 0,
 	 running = true,
 	 
 	 plane = new Image(),
 	 tree = new Image(),
 	 
 	 island = {
 	 	radius: 40,
 	 	x: width/2 - 40,
 	 	y: height + 24,
 	 },

 	 levels =[
 	 {
 	 	island_width: 100,
 	 	island_offset: 0,
 	 	goal: 2,
 	 	troopers_left:5
 	 },{
 	 	island_width: 100,
 	 	island_offset: 0,
 	 	goal: 2,
 	 	troopers_left:5
 	 },{
 	 	island_width: 80,
 	 	island_offset: 120,
 	 	goal: 3,
 	 	troopers_left:5
 	 },{
 	 	island_width: 80,
 	 	island_offset: 200,
 	 	goal: 5,
 	 	troopers_left:8
 	 },{
 	 	island_width: 20,
 	 	island_offset: 0,
 	 	goal: 4,
 	 	troopers_left:8
 	 },{
 	 	island_width: 100,
 	 	island_offset: 200,
 	 	goal: 3,
 	 	troopers_left:3
 	 },{
 	 	island_width: 70,
 	 	island_offset: 0,
 	 	goal: 6,
 	 	troopers_left:8
 	 },{
 	 	island_width: 50,
 	 	island_offset: 150,
 	 	goal: 6,
 	 	troopers_left:8
 	 },{
 	 	island_width: 30,
 	 	island_offset: 50,
 	 	goal: 3,
 	 	troopers_left:5
 	 },{
 	 	island_width: 20,
 	 	island_offset: 250,
 	 	goal: 4,
 	 	troopers_left:5
	 },{
	 	island_width: 10,
 	 	island_offset: 0,
 	 	goal: 5,
 	 	troopers_left:5
	 }
 	 ];

 	 ctx.canvas.height = height;
 	 ctx.canvas.width = width;

 

 	 plane.horizontal = -200;
 	 plane.vertical = 50;
 	 plane.v0x = 0.1;


     plane.onload = function(){    
 	 	paintScreen();
 	 }; 

 	 plane.src = 'images/plane.png';
 	 tree.src = 'images/tree.png';	
	
 
 	 function paintScreen(){
 	 	checkTroopers();
 	 	
 	 	ctx.clearRect(0, 0, width, height);
 	 	drawIsland();
 	 	drawPlane();
 	 	drawTroopers();
 	 	movePlane();
 	 	drawTroopers();
 	 	moveTroopers();

 	 	setTimeout(paintScreen, time_interval);
 	 };

 	 function drawPlane(){
 	 	ctx.drawImage(plane, plane.horizontal, plane.vertical);
 	 };

 	 function movePlane(){
 	 	plane.horizontal += plane.v0x * time_interval;

 	 	if(plane.horizontal > width){
 	 		plane.horizontal = -200;
 	 	}
 	 };

 	 function drawIsland(){
 	 	var xPos = island.x + levels[level].island_offset,
 	 		island_width = levels[level].island_width;

 	 	ctx.fillStyle = '#e67300';
 	 	ctx.beginPath();

 	 	ctx.arc(xPos, island.y, island.radius, 1.2 * Math.PI, 1.5 * Math.PI);
 	 	ctx.lineTo(xPos, island.y - island.radius);
 	 	ctx.arc(xPos + island_width, island.y, island.radius, 1.5 * Math.PI, 1.8 * Math.PI);
 	 	ctx.closePath();
 	 	ctx.fill();

 	 	ctx.drawImage(tree, xPos + island_width - 35, island.y - 155);

 	 }

 	 function Trooper (x, y, v0x){
 	 	this.x = x;
 	 	this.y = y;
 	 	this.v0x = v0x;
 	 	this.x0 = x;
 	 	this.y0 = y;
 	 	this.time = 0;
 	 };

 	function drawTroopers(){
 	 	 
 	 	_.each(troopers, function(t){
 	 		ctx.fillStyle = 'black';
 	 		ctx.beginPath();
 	 		ctx.arc(t.x, t.y, 4, 0.5 * Math.PI, 2.5 * Math.PI);
 	 		ctx.fill();
 	 		ctx.lineWidth = 1.5;
 	 		ctx.lineTo(t.x, t.y + 12);
 	 		ctx.lineTo(t.x - 4, t.y + 25);
 	 		ctx.moveTo(t.x, t.y + 12);
 	 		ctx.lineTo(t.x + 4, t.y + 25);
 	 		if(arms_up){
	 	 		ctx.moveTo(t.x, t.y + 8);
	 	 		ctx.lineTo(t.x + 8, t.y + 6);
	 	 		ctx.moveTo(t.x, t.y + 8);
	 	 		ctx.lineTo(t.x - 8, t.y + 6);
 	 	 	} else {
	 	 		ctx.moveTo(t.x, t.y + 8);
	 	 		ctx.lineTo(t.x + 8, t.y + 14);
	 	 		ctx.moveTo(t.x, t.y + 8);
	 	 		ctx.lineTo(t.x - 8, t.y + 14);
			}
 	 		ctx.strokeStyle = 'black'
 	 		ctx.stroke();
 	 		ctx.closePath();
 	 	});
 	};

 	function moveTroopers(){
 		_.each(troopers, function(t){
 			t.x = t.x0 + t.v0x * t.time;
 			t.y = t.y0 + 0.5 * acceleration * Math.pow(t.time, 2);
 			t.time += time_interval;
 		});
 	};

 	function checkTroopers(){
 		_.each(troopers, function(t){
 			if(t.y > height + 20){
 				troopers.splice(t, 1);
 			}
 			if(t.y >= height - 35 && running){
 				var xPos = island.x + levels[level].island_offset;
 				if(t.x > xPos - 20 && t.x < xPos + levels[level].island_width + 20){
 					hits += 1;
 					troopers.splice(t, 1);
 				}
 			}
 		});

 		updateStats();

 		if(hits >= levels[level].goal && running){
 			troopers_left = levels[level].troopers_left;
 			running = false;

 			if(level == 10){
 				winGame();
 			} else {
 				$('#nxt_level h3').text('Next Level: '+ (level + 1));
 				$('#nxt_level').show();

 			} 			
 		}

 		if (troopers_left == 0 && troopers.length == 0 && running){
 			running = false;
 			level = 0;
 			$('#stats_container').hide();
 			$('#game_over').show();
 		}
 	};

 	function winGame(){
 		$('#start_page h1').text('YOU WON!');
 		$($('#start_page h3')[0]).text('Mission Accomplished!');
 		$($('#start_page h3')[1]).text('A satisfactory number of paratroopers made it to vacation alive.');
 		$('.start_btn').remove();
 		$('<a>',{
 			href: 'paratroopers.html',
 			text: 'Play Again?'
 		}).appendTo('#start_page .inner_modal');

 		$('#start_page').show();

 	};

 	function updateStats(){
 		$('.troopers').text('Troopers: '+ troopers_left);
 		$('.hits').text('Hits: '+ hits);
 		$('.goal').text('Goal: '+ levels[level].goal);

 	};

 	$(document).on('keypress',function(e){
 		if(e.charCode == 32 && troopers_left != 0 && running){
 			troopers_left--;
 			troopers.push(new Trooper(plane.horizontal + 115, plane.vertical + 60, plane.v0x));
 		}
 	});

 	setInterval(function(){
 		arms_up = !arms_up; 
 	},70);

 	$('.start_btn').on('click',function(){
 		$('#start_page').hide();
 		$('#nxt_level').hide();
 		$('#stats_container').show();
 		level++;
 		troopers_left = levels[level].troopers_left;
 		hits = 0;

 		running = true;

 	});

 	$('body').disableSelection();

});