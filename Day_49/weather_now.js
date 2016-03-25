$(document).ready(function(){
	var script = document.createElement('script');

   $('#input_value').focus();

   $('form').on('submit', function(e){
   	 	e.preventDefault();
   		$('#title').fadeOut(100);

   		$('form').animate({top:'-50px'}, 500);

   		setTimeout(function(){
   			$('#temp_container').fadeIn(200);

   		}, 500);
   });

   $('form').on('submit', function(e){
   		e.preventDefault();

   		var query = $.trim($('#input_value').val().toString());

   		if(query == ''){
   			$('#temp').text('');
   			$('#desc').text('Nothingness has no temperature');
   		} else {
   			script.src ='https://api.worldweatheronline.com/free/v1/weather.ashx?q=' + query + '&format=json&callback=getData&key=j8xvysb7t9jp2dvw7pwcbgs3';
   			script.id = 'api_call';
   			document.body.appendChild(script);
   		}

   		script = null;
   		$('#api_call').remove();
   		script = document.createElement('script');
   });

});

var getData = function(data){
	if ('error' in data.data ){
		$('#temp').text('');
		$('#desc').text('Unable to find location.');
 	} else {
 		var temp = data.data.current_condition[0].temp_F,
 			condition = data.data.current_condition[0].weatherDesc[0].value,
 			colors = ['#4200ff', '#0648ff', '#0084ff', '#009dff', '#00b6ff',
					  '#00d6ff', '#00FF81', '#FFF254', '#FFAD00', '#FF7800',
					  '#ff6300', '#ff2d00', '#FF0300'];

		$('#temp').text(temp);
		$('#desc').text(condition);
		$('#input_value').val('').attr('placeholder', data.data.request[0].query);

		if (temp < 0){
			$('body').css('backgroundColor', colors[0]);
		} else if (temp < 10){
			$('body').css('backgroundColor', colors[1]);
		} else if (temp < 20){
			$('body').css('backgroundColor', colors[2]);
		} else if (temp < 30){
			$('body').css('backgroundColor', colors[3]);
		} else if (temp < 40){
			$('body').css('backgroundColor', colors[4]);
		} else if (temp < 50){
			$('body').css('backgroundColor', colors[5]);
		} else if (temp < 60){
			$('body').css('backgroundColor', colors[6]);
		} else if (temp < 70){
			$('body').css('backgroundColor', colors[7]);
		} else if (temp < 80){
			$('body').css('backgroundColor', colors[8]);
		} else if (temp < 90){
			$('body').css('backgroundColor', colors[9]);
		} else if (temp < 100){
			$('body').css('backgroundColor', colors[10]);
		} else if (temp < 110){
			$('body').css('backgroundColor', colors[11]);
		} else if (temp >= 110){
			$('body').css('backgroundColor', colors[12]);
		}

 	}

};












