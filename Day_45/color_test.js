$(document).ready(function(){  
  
  var tHue = Math.floor(Math.random() * 360);
  var tSat = Math.floor(Math.random() * 100);
  var tLit = Math.floor(Math.random() * 100);
  var curHue = 0;
  var curLit = 0;
  var curSat = 0;
  var tries = 0;
  var satRange = ($(document).height()) - ($(window).height());
    
   $('#game_rules').on('click',function(){
   	   $('#main').hide();
   	   $('#game-info').show();
   });
   $('#close').on('click',function(){
   	   $('#game-info').hide();
   	   $('#main').show();
   });

  $('#game-box').css("background-color" , "hsl(" + tHue + ", " + tSat + "%, " + tLit + "%)");

  $('#user-box').on('mousemove',function(e){
  	 var x = e.pageX - $('#user-box').offset().left;
  	 var y = e.pageY - $('#user-box').offset().top;

  	 curHue = Math.floor( x / 300 * 360 );
  	 curLit = Math.floor( y / 300 * 100 );
 
    updateSample();   
  });

 $(window).scroll(function(){
 	var scrollPos = $(window).scrollTop();	
 	curSat = Math.round((scrollPos/satRange) * 100);

 	updateSample();
 });

 $('#user-box').on('click',function(){
 	var sHue = curHue;
 		sSat = curSat;
 		sLit = curLit;
 	tries ++;

 	calcDiff(sHue, sSat, sLit);	
 });

function calcDiff(h,s,l){
   var percentoffH = Math.abs((h/360) - (tHue/360));
   var percentoffS = Math.abs((s/360) - (tSat/360));
   var percentoffL = Math.abs((l/360) - (tLit/360));

   displayResults(percentoffH, percentoffS, percentoffL);
};
function displayResults(ph,ps,pl){
 	var h = (ph * 100).toFixed(2);
 	var s = (ps * 100).toFixed(2);
 	var l = (pl * 100).toFixed(2);

 	if(h == 0.00 && s == 0.00 && l == 0.00){
 		$('#win h2').text('It took you ' + tries +' tries to get the exact match');
    $('#main').hide();
 		$('#win').show();
 	} else if ( h < 2.00 && s < 2.00 && l < 2.00){
 		$('#message').text('Getting very close!');
 		$('#hue').text('Hue: ' + h + '%');
 		$('#sat').text('Saturation: ' + s + '%');
 		$('#lit').text('Lightness: ' + l + '%');
 	} else {
 		$('#message').text('Nope, you\'re off by:');
 		$('#hue').text('Hue: ' + h + '%');
 		$('#sat').text('Saturation: ' + s + '%');
 		$('#lit').text('Lightness: ' + l + '%');
 	}

};
function updateSample() {
	$('#user-box').css("background-color" , "hsl(" + curHue + ", " + curSat + "%, " + curLit + "%)");
}

});










