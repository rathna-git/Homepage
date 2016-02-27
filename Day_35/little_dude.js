$(document).ready(function(){

	var Dude = function(){
		healthCount = 10;
	  	loveCount = 10;
	  	happinessCount = 10;
	};

	$.extend(Dude.prototype,{

		feed : function(){
		healthCount += randomInt(2,4);

      	$('.mouth').addClass('feed');
        
        setTimeout(function(){
        	$('.mouth').removeClass('feed');
        },1000);
        decrementVitals('feed');
        },

        hug : function(){
          loveCount +=randomInt(2,4);

          $('#head').addClass('hug');

          setTimeout(function(){
           $('#head').removeClass('hug');
          },800);
          decrementVitals('hug'); 
        }, 

        play : function(){
        	happinessCount += randomInt(2,4);

        	$('#dude_container').addClass('play');

        	setTimeout(function(){
        		$('#dude_container').removeClass('play');
        	},1000);
        	decrementVitals('play');
        }
	});

	function decrementVitals(action){
		if (action == 'feed') {
			loveCount -= randomInt(1,2);
			happinessCount -= randomInt(1,2);
		} else if (action == 'hug'){
			healthCount -= randomInt(1,2);
			happinessCount -= randomInt(1,2);
		}else {
			healthCount -= randomInt(1,2);
			loveCount -= randomInt(1,2);
		}
		updateStats();
		styleDude();

		if (healthCount <=0 || loveCount <=0 || happinessCount <= 0){
			$('#module').show();
			$('#main').hide();
		}
	};

	function styleDude(){
		if (healthCount >= 23){
			$('#head').css({top:50, left:68, height:350, width:415});
		} else if (healthCount >=18){
			$('#head').css({top:100, left:88, height:270, width:320});
		}else if (healthCount >= 12){
			$('#head').css({top:125, left:108, height:220, width:260});
		} else {
			$('#head').css({top:145, left:138, height:170, width:200});
		}

		if ((loveCount < 6) || (happinessCount < 6) || (healthCount < 6)) {
			$('.mouth').addClass('frown');
			$('.mouth').removeClass('smile');
			$('.mouth').removeClass('joy');
		} else if (happinessCount >= 14 ){
			$('.mouth').addClass('joy');
			$('.mouth').removeClass('.smile');
		} else if ( happinessCount < 14 && happinessCount >=6){
			$('.mouth').addClass('smile');
			$('.mouth').removeClass('joy');
			$('.mouth').removeClass('frown');
		}

		if (loveCount >= 23) {
			$('#head').css({background:'#d6003d'});
		}else if (loveCount >= 18) {
			$('#head').css({background:'#ff749c'});
		} else if (loveCount >= 14) {
			$('#head').css({background:'#ff749c'});
		} else if (loveCount < 14 && loveCount >=6){
			$('#head').css({background:'#ffffff'});
		} else {
			$('#head').css({background:'#d8e6d4'});
		}
	};

	function updateStats(){
		if(healthCount <= 0 || loveCount <= 0 || happinessCount <= 0){
			$('#health').text('Health: XXX');
			$('#love').text('Love: XXX');
			$('#happiness').text('Happiness: XXX');
		} else {
			$('#health').text('Health: '+ healthCount);
			$('#love').text('Love: '+ loveCount);
			$('#happiness').text('Happiness: '+ happinessCount);
		}
	};

    function randomInt(min, max) {
	   return Math.floor(Math.random() * (max - min + 1) + min);
    };

var person = new Dude();
$('#btn_feed').on('click', person.feed);
$('#btn_hug').on('click', person.hug);
$('#btn_play').on('click', person.play);

});

