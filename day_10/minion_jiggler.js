$(document).ready(function () {
	var animations = [ 'shake',
					   'hop',
					   'spin',
					   'grow',
					   'hooray' ];

	function getRandomInt (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	$('.minion_box').on ('click', function () {
		var minion = this;
		var animation = animations[getRandomInt(0, 4)];

		$(minion).addClass(animation);

		setTimeout(function () {
			$(minion).removeClass(animation);
		}, 2100);
	});


});