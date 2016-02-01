$.fn.disableSelection = function() {
		return this
	    	.attr('unselectable', 'on')
	    	.css('user-select', 'none')
	    	.on('selectstart', false);
	};(jQuery);


$(document).ready(function(){

var messages = ["Nice job!",
					"Excellent clickin'!",
					"That was Awesome!",
					"Man are you good!",
					"Boom!",
					"You're a pro!",
					"Unbelievable!",
					"Insanity!",
					"You're on fire!",
					"That was crazy!",
					"You are blowin' my mind!"]
	var levels = 0

	function speedUpAnimation(elm){
		var speed = $(elm).css('animation-duration');
		var newSpeed = (speed.split('s'))[0] - 1;
		$(elm).css('animation-duration', newSpeed + 's');
	}

	function flashMessage(){
       
       var message = messages[levels];

       $('#congrats').text(message);
       levels++;

       $('#level').text(levels + 1);

       $('#message_container').show();
       $('#ball_container').hide();

       setTimeout (function(){ 
       	$('#message_container').hide(); 
       	$('#ball_container').show(); }, 3000);

	}

	$('#ball').on('click',function(){
       
       if(levels<11) {
                 
                 speedUpAnimation(this);

                 flashMessage();

       } else {
               $('#congrats').text('WINNER!');
               $('#next_level').text("Holy cow! You won the whole freakin' thing!");
               $('#replay').show();
               $('#ball_container').hide();
               $('#message_container').show();

              }
       });

   
    $('#container_left').disableSelection();
    $('#container_right').disableSelection();
	$('#message_container').disableSelection();

});








