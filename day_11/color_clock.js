$(document).ready(function(){

 function updateClock () {

   var currentTime = new Date();
   var currentHours = currentTime.getHours();
   var currentMinutes = currentTime.getMinutes();
   var currentSeconds = currentTime.getSeconds();
   var color = getColor(currentHours, currentMinutes, currentSeconds);

   //Pad the minutes and seconds with leading zeros
   currentMinutes = ( currentMinutes < 10 ? "0" : "") + currentMinutes;
   currentSeconds = ( currentSeconds < 10 ? "0" : "") + currentSeconds;

   //Choose either AM or PM as appropriate.
   var timeOfDay = (currentHours < 12 ) ? "AM" : "PM" ;

   //Convert the hours to 12-hour format
   currentHours = (currentHours>12) ? currentHours - 12 : currentHours ;

    //Convert an hours component of "0" to "12"
    currentHours = (currentHours == 0) ? 12 : currentHours ;

    //String for display
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

  $('#clock').html(currentTimeString);
  $('body').css('background-color', '#'+ color);
  $('#color').text(color);

  setTimeout(function(){updateClock()},100);
   
}

function getColor(currentHours, currentMinutes, currentSeconds) {
	
     red = Math.round(255 * (currentHours/23)).toString(16);
     green = Math.round(255 * (currentMinutes/59)).toString(16);
     blue = Math.round(255 * (currentSeconds/59)).toString(16);

   red = ( red.length < 2 ? "0" : "") + red;
   green = ( green.length < 2 ? "0" : "") + green;
   blue = ( blue.length < 2 ? "0" : "") + blue;

 return (red + green + blue).toUpperCase();
}

updateClock();
console.log('hello');

});















