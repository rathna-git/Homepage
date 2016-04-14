(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function(){

	var value,
		clock,
		cur_time,
	    miss = 0,
	    rounds = 30;

	$('#strt_btn').on('click',function(){
		$('#info').fadeOut();
		$('#container').show();
		$('#input').focus();
		displayNum();
		timer();
		
	});

	function displayNum(){

		var random = getRandomInt(1,1000);

		    if(random % 15 == 0 ){
				$('#num_container').text(random);
				value = "fizzbuzz";	
			} else if(random % 3 == 0 ){
				$('#num_container').text(random);
				value = "fizz";
			} else if (random % 5 == 0 ){
				$('#num_container').text(random);
				value = "buzz";			
			} else {
				displayNum();

			}
			return value;	    		
	};

	function timer(){
		var start = new Date().getTime(),
			elapsed = 0;

		clock = setInterval(function(){
			var time = new Date().getTime() - start;

			elapsed = Math.floor(time/1000);
			formatTime(elapsed);
		},500);
	};

	function formatTime(seconds){
		var min = Math.floor(seconds/60),
			sec = seconds % 60;

		if(sec < 10){
			sec = '0' + sec;
		}
		if (min < 10){
			min = '0' + min;
		}

		cur_time = min + ':' + sec;
		$('.time').text('Time: '+ cur_time);	
	};
		

 function updateEnd(){
  	$('#timer').text('Time: '+ cur_time);
  	$('#misses').text('Misses: '+ miss);
  	$('#accuracy').text('Accuracy: '+ (30/(30 + miss) * 100).toFixed(2) + '%');
  };

 $('#submit').on('click',function(e){
 	e.preventDefault();
 	var userValue = $('#input').val().toLowerCase().trim();

    $('#input').val('');

    if(userValue == value){
      rounds--;
      if(rounds == 0){
      	updateEnd();
      	$('#container').hide();
      	$('#end').show();
      	clearInterval(clock);
      } else {
      	displayNum();
      	$('.rounds').text('Rounds: '+ rounds);
      }
    } else {
    	miss ++;
    	$('.miss').text('Misses: '+ miss);
    	document.getElementById('sound').innerHTML="<audio autoplay><source src='audio/error.mp3' type='audio/mp3'></audio>";

    }
 });

 $('body').disableSelection();

	
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}