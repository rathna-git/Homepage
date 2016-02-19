$(document).ready(function(){
   
makeRain(50,800);

$('#water').on('click',function(){
   $('#drop_container').html(' ');
    for (var i = 0; i < 50; i++) {
    	$('#drop_container').append('<div class="drop rain  " id="drop_' + i + '" style="left:'+ random_value(30,300)+ 'px;"><div>');
    }
});

$('#hearts').on('click',function(){
	$('#drop_container').html(' ');
    for (var i = 0; i < 50; i++) {
    	$('#drop_container').append('<div class="drop heart  " id="drop_' + i + '" style="left:'+ random_value(30,300)+ 'px;"><div>');
    }
});

$('#cupcakes').on('click',function(){
    $('#drop_container').html(' ');
    for (var i = 0; i < 50; i++) {
    	$('#drop_container').append('<div class="drop cupcake" id="drop_' + i + '" style="left:'+ random_value(30,300)+ 'px;"><img class="cupcake" src="images/cupcake.png"><div>');
    }
});
   

function random_value(min,max){
 return Math.floor (Math.random() * (max - min + 1)+ min);
};

function makeRain(num, speed) {
	if (num > 0) {
		setTimeout(function () {
			$('#drop_' + random_value(1, 50)).addClass('animate');
			num--;
			makeRain(num, speed);
		}, speed);
	}
};
   		


});