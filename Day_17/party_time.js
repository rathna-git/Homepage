$(document).ready(function(){

$('form').on('submit',function(event){
	event.preventDefault();
     
     var months = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sept","Oct","Nov","Dec"];

        var year
		var month
		var day
		var birthday = document.getElementById('#datepicker').value;



		if ( birthday == 0 ) {
			$('#party').text('No Birthday? No Parties for You!');
		} else { 

			        
			        birthday = birthday.split('-');  //[ year, month, day ]
					var year  = birthday[0];
					var month = (birthday[1])-1;
					var date   = birthday[2];
					
				} 

    

    var birthtime = document.getElementById('#timepicker').value;
    birthtime= birthtime.split(':');

   var hour  = birthtime[0];
   var min   = birthtime[1];
   var bday= new Date(year, month, date);
   var btime=new Date(year, month, date, hour, min);
   var today = new Date();
   var todayStr = today.toDateString();


   if (birthtime == 0) {
				btime = bday;
			}

			var age   = today.getFullYear() - year;

			if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
				age--;
			}



//var age =  getAge();
var ageInDays =  Math.floor((today - bday)/(86400000));
var ageInMinutes = Math.floor((today - btime)/(60000));
var tenKDay = (new Date(bday.getTime() + 86400000 * 10000));
var twentyKDay = (new Date(bday.getTime() + 86400000 * 20000));
var fiveHundKHour = (new Date(bday.getTime() + 1800000000000));
var millionMin = (new Date(bday.getTime() + 60000000000));
var tenMillionMin = (new Date(bday.getTime() + 600000000000));
var fiftyMillionMin = (new Date(bday.getTime() + 3000000000000));
var oneBillionSec = (new Date(bday.getTime() + 1000000000000));



if (today.getMonth() == bday.getMonth() && today.getDate() == bday.getDate()) {
				$("#party").text("Today's your birthday?! PARTY TIME!");
			} else if (todayStr == (tenKDay.toDateString() || twentyKDay.toDateString() || fiveHundKHour.toDateString() || millionMin.toDateString() || tenMillionMin() || fiftyMillionMin() ) ) {
				$('#party').text("Looks Like We've Got a Party Here!");
				
			} else {
				$('#party').text("Boo! No Parties Today.");				
			}



			$("#date").text("Your birthday is " + months[month] + ' ' + date);

			if (age == 1) {
				$("#years").text("You're " + age + ' year old');
			} else {
				$("#years").text("You're " + age + ' years old');
			}

			if (ageInDays == 1) {
				$("#days").text("You're " + ageInDays + ' day old');
			} else {
				$("#days").text("You're " + ageInDays + ' days old');
			}

			if (ageInMinutes == 1){
				$("#mins").text("You're " + ageInMinutes + ' minute old');
			} else {
				$("#mins").text("You're " + ageInMinutes + ' minutes old');
			}

			if (today <= tenKDay) {
				$("#10k").text("Your 10,000th day is " + tenKDay.toDateString());
			} else {
				$("#10k").text("Your 10,000th day was " + tenKDay.toDateString());
			}

			if (today <= twentyKDay) {
				$("#20k").text("Your 20,000th day is " + twentyKDay.toDateString());
			} else {
				$("#20k").text("Your 20,000th day was " + twentyKDay.toDateString());
			}

			if (today <= fiveHundKHour) {
				$("#500k").text("Your 500,000th hour is " + fiveHundKHour.toDateString());			
			} else {
				$("#500k").text("Your 500,000th hour was " + fiveHundKHour.toDateString());						
			}

			if (today <= millionMin) {
				$("#1mil").text("Your one millionth minute is " + millionMin.toDateString());			
			} else {
				$("#1mil").text("Your one millionth minute was " + millionMin.toDateString());			
			}

			if (today <= tenMillionMin) {
				$("#10mil").text("Your ten millionth minute is " + tenMillionMin.toDateString());
			} else {
				$("#10mil").text("Your ten millionth minute was " + tenMillionMin.toDateString());			
			}

			if (today <= fiftyMillionMin) {
				$("#50mil").text("Your fifty millionth minute is " + fiftyMillionMin.toDateString());
			} else {
				$("#50mil").text("Your fifty millionth minute was " + fiftyMillionMin.toDateString());			
			}

			if (today <= oneBillionSec) {
				$("#1bil").text("Your one billionth second is " + oneBillionSec.toDateString());
			} else {
				$("#1bil").text("Your one billionth second was " + oneBillionSec.toDateString());			
			}


function getAge() {
				var age   = today.getFullYear() - year;

				if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
					age--;
				}
				return age;
            };

     

});

});