$(document).ready(function(){
	
      for(j=0;j<18;j++){
      	    for (i=0; i<9; i++) {
   				$('#container').append('<div class = "boxes"></div>');
                 }
        }

	$('.boxes').hover(function(){
      var color = (Math.floor(Math.random()*16777216)).toString(16);
   	  $(this).css('display','block');
      $(this).css('background-color', color);
      $(this).css('box-shadow', '0 0 10px #ffffff'); },

   	  function(){ 
   	  $(this).css('box-shadow', "none");
       });  
      	
});