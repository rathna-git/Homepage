$(document).ready(function(){

    startTimer();

	function startTimer(){
		setInterval (displayTime, 1000);
	    displayTime();
	}

	function displayTime(){

		var now = new Date();
		var h = now.getHours();
		var m = now.getMinutes();
		var s = now.getSeconds();

		var timeString = formatHour(h) + ":" + padZero(m) + ":" + padZero(s) + " " + getTimePeriod(h);
	
 		var canvas = document.querySelector('#clock');
 		var context = canvas.getContext("2d");

 		// clock radius
 		var clockRadius = 275;

 		// center clock
 		var clockX = canvas.width / 2;
 		var clockY = canvas.height / 2;

        Math.TAU = 2 * Math.PI;
        context.clearRect(0,0, canvas.width, canvas.height);

        // Draw background

        for (var i = 0; i < 12; i++) {
        	var innerDist       = (i % 3) ? 0.75 : 0.7;
        	var outerDist       = (i % 3) ? 0.95 : 1.0;
        	context.lineWidth   = (i % 3) ? 4 : 10;
        	context.strokeStyle =  '#999999';

        	var armRadians = (Math.TAU * (i/12)) - (Math.TAU/4);
        	var x1 = clockX + Math.cos(armRadians) * (innerDist * clockRadius);
        	var y1 = clockY + Math.sin(armRadians) * (innerDist * clockRadius);
        	var x2 = clockX + Math.cos(armRadians) * (outerDist * clockRadius);
        	var y2 = clockY + Math.sin(armRadians) * (outerDist * clockRadius);

        	context.beginPath();
        	context.moveTo(x1, y1);
        	context.lineTo(x2, y2);
        	context.stroke();
        }

        function drawArm(progress, armThickness, armLength, armColor){
        	var armRadians = (Math.TAU * progress) - (Math.TAU/4);
        	

        	var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
        	var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);

        	context.lineWidth = armThickness;
        	context.strokeStyle = armColor; 

        	context.beginPath();
        	context.moveTo(clockX, clockY); //start at the center
        	context.lineTo(targetX,targetY); // Draw a line outwards
        	context.stroke();
        }

        var hProgress = (h/12) + (1/12) * (m/60) + (1/12) * (1/60) * (s/60);
        var mProgress =                   (m/60) +          (1/60) * (s/60);
        var sProgress =                                              (s/60);

        drawArm(hProgress, 10, 0.50, '#fff'); //Hour
        drawArm(mProgress, 4, 0.75, '#fff'); // Minute
        drawArm(sProgress, 2, 1.00, '#cc5200'); // Seconds-Orange
	}

	function padZero(num){
		if (num < 10){
			return "0" + String(num);
		} else {
			return String(num);
		}
	}

	function formatHour(h){
		var hour = h % 12;

		if (hour == 0) {
			hour = 12;
		}
		return String(hour);
	}

	function getTimePeriod(h){
		return (h < 12) ? "AM" : "PM";
	}

});











