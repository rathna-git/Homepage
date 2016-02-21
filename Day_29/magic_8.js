$(document).ready(function(){
	var answers = ["Signs point to yes", "Yes", "Reply hazy, try again",
				  "Without a doubt", "My sources say no", "As I see it, yes",
				  "You may rely on it", "Concentrate and ask again", 
				  "Outlook not so good", "It is decidedly so",
				  "Better not tell you now", "Very doubtful", "Yes - definitely",
				  "It is certain", "Cannot predict now", "Most likely",
				  "Ask again later", "My reply is no", "Outlook good",
				  "Don't count on it"];

	$('#question').focus();


   $('form').on('submit', function() {
      $('#inner_circle').fadeOut('200');  

   });

   $('form').on('submit',function(e){
         e.preventDefault();

         if($('#question').val()){
         	returnAnswer(answers[Math.floor(Math.random() * 20)]);
         } else {
         	returnAnswer('Hey! I\'m not a mind reader !');
         }
   });

   function returnAnswer(answer){
   	$('#answer_tile').fadeOut('400',function(){

   		$('#reply').text(answer);

   		setTimeout(function(){
   			$('#answer_tile').fadeIn('1300');
   		}, 400);

   	  });

   };

});