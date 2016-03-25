(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);


$(document).ready(function(){

	var w = parent.innerWidth;

$('body').disableSelection();

_.each(magneticWords, function(word){

	$('<div>',{
		class: 'magnet',
		style: 'position: absolute',
		text: word }).css({
			top: Math.random()* 170,
			left: Math.random()* w * 0.70 
		}).draggable().appendTo('#magnet_container');
	});

});





    
		
