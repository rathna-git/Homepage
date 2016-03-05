$(document).ready(function(){
	var canvas = document.getElementById('canvas'),
	    ctx = canvas.getContext('2d');
	var correctCount = 0,
	    wrongCount = 0,
	    missedCount = 0;
	var h = 550,
	    w = 700;
	var characters = [];
	var s = 1;

	ctx.font = "40px Century Gothic";
	ctx.fillStyle="#333";

$('#start_page').fadeOut(4000);

setTimeout (function(){  
    $('#game_container').fadeIn(1000);
    init();

	$(document).on('keypress', function(key){
		var c = String.fromCharCode(key.charCode);
		var err = 1;

		_.each(characters, function (obj, i) {
			if (c == obj.letter){
				correctCount += 1 ;
				updateStat('correct', correctCount);
				characters[i]= new Character();
				err = 0;
			}
		});

		if (err == 1){
			wrongCount += 1;
			updateStat('wrong', wrongCount);
		}
		if ( correctCount % 10 == 0){
			s += 1;
			for(var i=0; i<5; i++ ){
				characters.push(new Character());
			}
		}
	});
}, 4500);

function failModal(){
	var decimal = (correctCount / (correctCount + wrongCount + missedCount)*100);
	var percent = Math.round((decimal)*Math.pow(10,2))/Math.pow(10,2);
	if(wrongCount == 1){
		$('#result').text('You got '+ correctCount+' right with '+ wrongCount +' error.');
	}else {
		$('#result').text('You got '+ correctCount+' right with '+ wrongCount +' errors.');
	}
	$('#perc').text(percent + '%');
	$('#modal').show();
	$('#game_container').hide();
};

function init(){
	for (var i=0; i< 10; i++){
		characters.push(new Character());
	}
	drawChars();
};

function Character(){
	this.x = Math.random() * 600 + 50;
	this.y = 40;
	this.letter = String.fromCharCode(randomInt(33,126));
	this.speed = Math.random() * s;
};

function drawChars(){
	ctx.clearRect(0,0,w,h);
	_.each(characters, function(c,i){
		ctx.fillText(c.letter, c.x, c.y);

		if (c.y + c.speed > h + 40){
			missedCount += 1;
			updateStat('missed', missedCount);
			characters[i] = new Character();
		}
		c.y += c.speed;
	});

	if (missedCount >= 20) {
		ctx.clearRect(0,0,w,h);
		failModal();
	} else {
		setTimeout(drawChars, 20);
	}
};

function updateStat (id, stat){
	$('#' + id).text(id + ': ' + stat);
};


});
 function randomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
 };	

