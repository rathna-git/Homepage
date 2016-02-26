$(document).ready(function(){
	var word = RandomWord();
	var score = 0;
	var chances = 3;
	var letters = shuffle(word);


$('#start_button').on('click',function(){

   	$('#start_page').fadeOut('slow');
    $('#game_page').fadeIn('slow');
    $('#word_container').text(letters);

});


$('#user_submit').on('click', function(e) {
	e.preventDefault();

	checkGuess();
});

function checkGuess() {

	var userWord = $('#user_word').val().toUpperCase();
	
	if (userWord == word) {
		console.log("Winner")
        score++;

        $('.user_submit').attr('disabled', 'disabled');
		$('#message').text('You are RIGHT! The word was ' + word);
		$('#score_container').text('Score: '+ score );

		setTimeout (function() { 
			newRound();
		}, 3000);

	} else {
		chances --;
		if (chances == 1 ){
			$('#message').text("Incorrect! 1 chance left");
		} else if (chances <= 0) {
             $('#message').text("Incorrect! You are out of chances");
             $('#word').text('The word was '+ word);
             $('.user_submit').attr('disabled', 'disabled');
		} else {
			$('#message').text("Incorrect! You have " + chances + " left");
		}

	  }

	  if(chances == 0) {
	  	score--;

	  	$('#score_container').text('Score: '+score);
	  	setTimeout(function() {
	  		$('.user_submit').removeAttr('disabled');
	  		newRound();
	  	}, 3000);
	  }
		
 };

 function newRound() {
 	word = RandomWord();
 	letters = shuffle(word);
 	chances = 3;
 	$('.user_submit').removeAttr('disabled');
 	$('#user_word').val('');
 	$('#word_container').text(letters);
 	$('#message').text('Here is your next word');
 	$('#word').text('');

 };

function RandomWord() {
       
        var array;

        $.ajax({
            type: 'GET',
            url: 'http://randomword.setgetgo.com/get.php',
            async: false,
            success: function(data){
            	console.log(data);
            	    array = data;
             }  
        });  
        return array.toUpperCase();   
    };

function shuffle(str) {
		var a = str.split("");
		var len = a.length;

		for(var i = len - 1; i > 0; i--){
			var j = Math.floor(Math.random() * i);
			var tmp = a[i];
			a[i] = a[j];
			a[j] = tmp;

			}
			return a.join('');
		
		
	
	};


   

});