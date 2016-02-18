$(document).ready(function(){
	var colors = ['red','green','blue','yellow'];
	var level = 1;
	var curPattern = [];
	var i = 0;

    $('#start_button').on('click',function(){
       $('#start_page').hide();
       $('#game_page').show();

      makePattern();

    });

function getAttempt() {
 	var attempt = [];
 	var i = 0;

 	$('.pad').on('click',function(){
 		var color = this.id;
 		attempt.push(color);
 		lightPad(color);

 		if (attempt[i] != curPattern[i]){
 			playSound('fail');
 			$('.pad').off();
 			$('#fail').show().fadeOut('slow');
 			curPattern=[];
 			level = 0;
 			setTimeout(function () {
 				makePattern();
 			},1000);
 		} else if (curPattern.length == attempt.length){
 			$('.pad').off();
 			level++;
 			makePattern();
 		} else {
 			i++;
 		}

 	});
};

  function flashPattern(){
 	setTimeout(function(){
 		if (i < curPattern.length){
 			     lightPad(curPattern[i]);
 			     i++;
 			     flashPattern();
 		} else {
 			i = 0;
 			getAttempt();
 		}
 	},800);
 };

function makePattern(){
	$('#level').text('Level '+ level);
	var color = colors[Math.floor(Math.random() * 4)];

	setTimeout(function(){
		curPattern.push(color);
		flashPattern();
	},800);
};

function playSound(color){

	var mp3_sound = color + '.mp3';
	var ogg_sound = color + '.ogg';

	document.getElementById('sound').innerHTML="<audio autoplay><source src='audio/" + mp3_sound + "' type='audio/mpeg'></audio>";
    document.getElementById('sound').innerHTML="<audio autoplay><source src='audio/" + ogg_sound + "' type='audio/ogg'></audio>";
};

function lightPad(color) {
	$('#'+ color).addClass('glow_'+ color);
	playSound(color);
	setTimeout(function(){
		$('#'+ color).removeClass('glow_'+ color);
	}, 500);
};

});