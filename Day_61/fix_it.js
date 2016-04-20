(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function(){

	 var length = 10;

	 $('#btn').on('click',function(){
	 	setButton();
	});

	 function progressBar(){
	 	setTimeout(function(){
	 		$('.progress_container').show();

	 		$('.inner_bar').css('width',length);

	 		incrementBar();

	 	}, 100);
	 };

	 function incrementBar(){
	 	length++;

	 	if(length > 520){
	 		length = 10;

	 		$('.wrench').remove();
	 	    $('#fix_btn').html('<img class="wrench" src="images/wrench.png">');

	 	    $('.progress_container').hide();
	 	    $('.inner_bar').css('width', 10);
	 	    $($('p')[0]).text('Your problem should now have been fixed.');
	 	    $($('p')[1]).text('If your problem persists, press the Fix It button again.');
	 	    $('#info').fadeIn('fast');
	 	} else {
	 		$('.inner_bar').css('width',length);
	 		setTimeout(incrementBar,20);
	 	}
	 };

	 function setButton(){
	 	$('#info').fadeOut('fast');	 	
	 	$('.wrench').remove();
	 	$('#fix_btn').html('<img class="wheel" src="images/wheel.png">');

	 	progressBar();
	 };

   $('body').disableSelection();	 
	
});