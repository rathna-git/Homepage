(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function(){

var blurInc = 0;
var spreadInc = 0;
var blurIncTwo =0;
var vertInc = 0;


$('.box_shadow').on('click', function () {

		var newBlur = blurInc;
		blurInc+=3;

		var newSpread = spreadInc; 
		spreadInc++;

		$(this).css('box-shadow', '1px 0px ' + newBlur + 'px ' + newSpread + 'px rgb(26, 26, 26)' );
	});


$('.text_shadow').on('click',function(){

	    var newBlurTwo = blurIncTwo;
		blurIncTwo++;

		var newVert = vertInc; 
		vertInc++;

	$(this).css('text-shadow', '1px ' + newVert + 'px ' + newBlurTwo + 'px rgb(26, 26, 26)');
	
    
});



$('body').disableSelection();





});