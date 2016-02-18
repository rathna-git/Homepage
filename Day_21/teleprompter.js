$(document).ready(function(){
  

  $('#submit').on('click',function(event){
      event.preventDefault();

     

  	  var text = $("#comment").val();
  	  var y = 0;

  	  if (text.replace(/^\s+|\s+$/g, '') == '') {
			text = 'You should probably enter some text next time.'
		}

  	  $('#main_page').remove();
  	  $("body").css('background-color', '#090919');
  	  $('#container').html('<div id="teleprompt_screen">' + text + '</div>');
      
      scrollText(y);

      function scrollText(y) {

			setTimeout(function () {
				var newY = y;
				var height = $('#teleprompt_screen').height();

				if (newY > -1 * height - 150) {
					newY -= 1;
					$('#teleprompt_screen').css('top', newY);

					scrollText(newY);
				}
			}, 25);
		};
      

});


});