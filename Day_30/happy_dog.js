$(document).ready(function() {
	$('.bone_container').draggable({ });
	$('#dog_face').droppable({
		drop: function(event, ui){
            eat_animation();
		},

	});

	$('#dog_container').on('click',function(){
         $('h3').text('WOOF!');
         $('#message_cloud').show();
         $('#dog_container').addClass('jump');
         $('#mouth').css({ "background-color":"#ab0014", "height":"15px", "border-radius": "50px"});
         
         document.getElementById('sound').innerHTML="<audio autoplay><source src='audio/woof.mp3' type='audio/mpeg'></audio>";
         setTimeout(function () {
			$('#message_cloud').fadeOut('600');
			$('#dog_container').removeClass('jump');
			$('#mouth').css({ "background-color":"#333333", "height":"4px", "border-radius": "none"});
		}, 3000);
	}); 

	function eat_animation(){
		$('.nose').addClass('eat_nose');
		$('#mouth').addClass('eat_mouth');
		$('.dot').hide();
		$('#left_eye').addClass('eat_eyes');
		$('#right_eye').addClass('eat_eyes');
		$("#mou_left").hide();
		$("#mou_right").hide();
		$('.bone_container').fadeOut(300);
		$('h3').text('GULP!');
		$('#message_cloud').show();

		setTimeout(function () {
			$("#mou_left").show();
		    $("#mou_right").show();
		    $('.dot').show();
			$('.nose').removeClass('eat_nose');
			$('#left_eye').removeClass('eat_eyes');
			$('#right_eye').removeClass('eat_eyes');
			$('#mouth').removeClass('eat_mouth');
			$('#message_cloud').fadeOut('600');
			replaceFood();
		}, 1000);
	};

	function replaceFood() {
		$('.bone_container').css({top: 550, left: 600,});
		$('.bone_container').show();
	}
});

