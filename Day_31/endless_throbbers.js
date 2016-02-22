(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function(){
	var click=0;
	 
	$('body').disableSelection();
	 
    $('body').on('click',function(e){
     	
    	if(click == 0){
    	$('#container').append('<div class="throbber1" style="position:absolute;  top:350px"></div>');    	
        click+=1;

        setTimeout(function(){
        	$('#instruction').text('That\'s odd. Try clicking somewhere else.');
        }, 2000);

    } else if (click == 1){
       
       throbber(e);
       setTimeout(function(){
       $('#instruction').text('So weird! Maybe try the other side?');
   }, 2000);

       } else if (click == 2){
       	throbber(e);

    	setTimeout(function(){
    		$('#instruction').text('Welp! I\'ve got nothing else now. You are on your own now.');
    	},2000);
       
       setTimeout(function(){

       	$('#instruction').fadeOut('2000');
       },4000);
    } else {
    	throbber(e);
    }
});
    
function throbber(e){
    	var random= Math.floor((Math.random()* 9)+ 1);
    	
    	$('#container').append('<div class="throbber' + random + '" style="position:absolute; top:'+ e.pageY +'px;left: '+ e.pageX +'px"></div>');
        click+=1;
    }
});
