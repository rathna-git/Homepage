(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function(){
	var x = 0,
		y = 0,
		super_mode = false;

	function makeWrap() {
		for(i = 0; i < 24; i++){
			for(j = 0; j < 14; j++){
				var num = j + (i * 14);
					  $('<div>', {
						class: 'bubble',
						id: num,
					  }).html('<img src="images/bubble.png">').appendTo('#bubble_wrap')
					  .css({top: y, left: x})
					  .on('click', function() {
					  	$(this).hide();
					  	$('#' + this.id +'pop').show();
					  	document.getElementById('sound').innerHTML="<audio autoplay><source src='audio/pop.mp3' type='audio/mp3'></audio>";
					  })
					  .on('mouseover',function(){
					  	if (super_mode){
						  	$(this).hide()
						  	$('#' + this.id +'pop').show();
						  	document.getElementById('sound').innerHTML="<audio autoplay><source src='audio/pop.mp3' type='audio/mp3'></audio>";
					    }
					  });

					  $('<div>',{
					  	class: 'popped',
					  	id: num +'pop',

					  }).html('<img src="images/popped.png">').appendTo('#bubble_wrap')
					  .css({top:y, left: x})
					  .hide();

			x += 39;

			  if(x > 790){
			  	if(j % 2 == 0){
			  		x = -19;
			  	} else {
			  		x = 0;
			  	}
                 y +=33;
			  }
		   }
		}
	};
	makeWrap();

	$('#super').on('click',function(){

		if(super_mode){
			$('#super').removeClass('on');
			super_mode = !super_mode;
			$('#super').addClass('off');
			
		} else {
			$('#super').removeClass('off');
			super_mode = !super_mode;
			$('#super').addClass('on');						
		}
	});

	$('#reset').on('click', function (){
        $('.popped').hide();
        $('.bubble').show();
    });


  $('body').disableSelection();


});