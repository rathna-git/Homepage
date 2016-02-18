$(document).ready(function(){
  $('body').on('keypress',function(){
     $('#main_page').fadeOut('slow');
     $('#email_container').fadeIn('slow');
      
      $('#message_box').on('keyup',function(){
      	
      	var charLength = $('#message_box').val().length;
        $('#count_bar').text('Character Count: '+ charLength );
           
           if (charLength >= 150 && charLength < 200 ) {
           	$('#count_bar').css("background-color","#ff9933");
           }
           if (charLength >= 200 && charLength < 250 ) {
           	$('#count_bar').css('background-color','#ff751a');
           }
           if (charLength >= 250 ) {
           	$('#count_bar').css('background-color','#cc0000');
           }  
          
          $('#message_box').css('font-size',reduce_font(charLength) + 'px');

      });

       function reduce_font(charLength){

        var fz = 200;
    	var expValue = Math.exp(-0.5);
    	var displayFz = fz  - (charLength * expValue);

        return displayFz;
      };

  });


});