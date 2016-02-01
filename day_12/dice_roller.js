$(document).ready(function () {
	$('.dot4').hide();

	pressBtn('#shaker');

	$('#shaker').on('click', function() {
		
			$('#heading').text('Shake, shake, shake...');
			
			$('#d1').addClass('shake');
			$('#d2').addClass('shake');

		setTimeout(function(){
			var roll1 = makeDieFace('#d1');
			var roll2 = makeDieFace('#d2');

			
			$('#d1').removeClass('shake');
			$('#d2').removeClass('shake');

			if (roll1+roll2 == 2){
				$('#heading').text('Snake eyes!');
			} else {
				$('#heading').text(roll1 + roll2);				
			}

		}, 1000);

	});

	function pressBtn(button) {
		$('#shaker').on('mousedown', function() {
			$(this).removeClass('btn_up');
			$(this).addClass('btn_down');
		});
		$('#shaker').on('mouseup', function() {
			$(this).removeClass('btn_down');
			$(this).addClass('btn_up');
		});
	}


	function makeDieFace(dieId) {
		var roll = Math.floor(Math.random() * 6 + 1);
		var all = dieId + ' .dot';
		var dice1 = dieId + '_dice1';
		var dice2 = dieId + '_dice2';
		var dice3 = dieId + '_dice3';
		var dice4 = dieId + '_dice4';
		var dice5 = dieId + '_dice5';
		var dice6 = dieId + '_dice6';
		var dice7 = dieId + '_dice7';
		

		if (roll == 1){
			$(all).hide();
			$(dice4).show();
		}
		if (roll == 2){
			$(all).hide();
			$(dice1 + ', ' + dice7).show();
		}
		if (roll == 3){
			$(all).hide();
			$(dice1 + ', ' + dice4 + ', ' + dice7).show();
		}
		if (roll == 4){
			$(all).show();
			$(dice2 + ', ' + dice4 + ', ' + dice6).hide();
		}
		if (roll == 5){
			$(all).show();
			$(dice2 + ', ' + dice6).hide();
		}
		if (roll == 6){
			$(all).show();
			$(dice4).hide();
		}

		return roll;
	}	
});