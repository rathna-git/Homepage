$(document).ready(function(){
   
   $('button').on('click', function(){
          $(this).hide();
          showButton();
   });

   function showButton (){
   var i = randomNumber (0,9);
   $('#button'+ i).css({top: randomNumber(50,450), left: randomNumber(50,800)}).show();
   };

   function randomNumber(min, max){
       return Math.floor(Math.random() * (max - min) + min);
   };

});