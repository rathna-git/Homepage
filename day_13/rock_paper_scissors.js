$(document).ready(function(){

$('.rock').hide();
$('.paper').hide();
$('.scissors').hide();

var x;
var user = ['#userRock','#userPaper', '#userScissors'];
var comp = ['#compRock','#compPaper', '#compScissors'];
 

$('#r_button').on('click', function(){

	$('#message').hide();

   display();

	x=0;

	$('.hand').addClass('shake');

	setTimeout(function(){

   $('.hand').removeClass('shake');
    $('#message').show();

   showResults();
   },1000);

});

$('#p_button').on('click', function(){

	$('#message').hide();

	display();

	x=1;
	
	$('.hand').addClass('shake');

	setTimeout(function(){

   $('.hand').removeClass('shake');
   $('#message').show();

   showResults();
   },1000);

});

$('#s_button').on('click', function(){

    $('#message').hide();

    display();

   x=2;
   $('.hand').addClass('shake');
    
    setTimeout(function(){

   $('.hand').removeClass('shake');
   $('#message').show();

   showResults();
   },1000);

});

function display(){

$('.rock').hide();
$('.paper').hide();
$('.scissors').hide();
$('.hand').show();

}

function showResults(){

var random = Math.floor(Math.random() * 3);
$('.hand').hide();
$(user[x]).show();
$(comp[random]).show();

if (random == x)  {
   $('#message').text('Tie!');

}
else if ((random == 0 && x==1) || (random == 1 && x==2) || (random == 2 && x==0 ) ){
   $('#message').text('You win!');
}
   
else {
   $('#message').text('Computer wins!');
}

}


});