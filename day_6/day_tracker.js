$(document).ready(function() {
	

var weekday = new Array(7);


weekday[0]= "Funday Sunday!";
weekday[1]= "Have a great start of the week";
weekday[2]= "OH ! It's a Tuesday";
weekday[3]= "Happy Humpday!";
weekday[4]= "It's a thursday !";
weekday[5]= "Friyaaay !";
weekday[6]= "Partyyyyy !";

var x = new Date;
var d = x.getDay();

$('#day'+ d).attr('id','today');
$("#message").text(weekday[d]);




});