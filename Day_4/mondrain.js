$(document).ready(function(){

	var pickedcolor;

	     function colorfunction(x){
         pickedcolor = $(x).css("background-color");
         }    

       $("#redbox"). click(function (){
          colorfunction(".color1");
           });

       $("#bluebox"). click(function (){
          colorfunction(".color2");  
         });

       $("#yellowbox"). click(function (){
          colorfunction(".color3");  
         });

       $("#greenbox"). click(function (){
          colorfunction(".color4");  
         });

          
          $('#box1').click(function(){
       	  $('#box1').css({"background-color": pickedcolor});
          });

          $('#box2').click(function(){
       	  $('#box2').css({"background-color": pickedcolor});
          });

          $('#box3').click(function(){
       	  $('#box3').css({"background-color": pickedcolor});
          });

          $('#box4').click(function(){
       	  $('#box4').css({"background-color": pickedcolor});
          });

          $('#box5').click(function(){
       	  $('#box5').css({"background-color": pickedcolor});
          });

          $('#box6').click(function(){
       	  $('#box6').css({"background-color": pickedcolor});
          });

          $('#box7').click(function(){
       	  $('#box7').css({"background-color": pickedcolor});
          });

          $('#box8').click(function(){
       	  $('#box8').css({"background-color": pickedcolor});
          });

          $('#box9').click(function(){
       	  $('#box9').css({"background-color": pickedcolor});
          });

          $('#box10').click(function(){
       	  $('#box10').css({"background-color": pickedcolor});
          });

          $('#box11').click(function(){
       	  $('#box11').css({"background-color": pickedcolor});
          });

});