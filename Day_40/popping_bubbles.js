$(document).ready(function() {
	var canvas = document.getElementById("canvas");
	    ctx = canvas.getContext("2d");
	    var h = window.innerHeight;
		var w = window.innerWidth;   
	    var bubbles = [ ];

        canvas.height = h;
        canvas.width = w;

	init();
    
    $('#canvas').on('click', function(e) {
		var clickX = e.pageX;
		var clickY = e.pageY;

		_.each(bubbles, function(b, i) {
			if ((clickX < b.xPos + b.size && clickX > b.xPos - b.size) && (clickY < b.yPos + b.size && clickY > b.yPos - b.size)) {
				b.pop(i);
			}
		});
	});

	function init(){
		for (var i = 0; i < 20; i++){
			bubbles.push(new Bubble());
		}
		makeBubble();
	}

	function Bubble() {
		this.speed = Math.random() * 2;
		this.size = Math.random() * 60 + 5;
		this.xPos = randomInt(65, (w - 65));
		this.yPos = randomInt((h + 70),(h + 100));
        
        };

        Bubble.prototype.pop = function(i) {

			document.getElementById('sound').innerHTML="<audio autoplay><source src ='audio/pop.mp3' type='audio/mpeg'></audio>";
		    
		    bubbles[i] = new Bubble();
		}

  

    function makeBubble(){
    	ctx.clearRect(0,0,w,h);
    	_.each(bubbles, function (b, i){
    		var grd = ctx.createRadialGradient(b.size + b.xPos, b.size + b.yPos, b.size * 3, b.size + b.xPos, b.size + b.yPos, b.size);
    		grd.addColorStop(0,"rgba(91,174,252,0.7)");
    		grd.addColorStop(0.7,"rgba(207,231,254,0.5)");

    		ctx.fillStyle = grd;
    		ctx.shadowBlur = 20;
    		ctx.shadowColor = "rgb(255,255,255)"
    		ctx.beginPath();
    		ctx.arc(b.xPos, b.yPos, b.size, 0, Math.PI *2);
    		ctx.fill();

    		if (b.yPos < 0 - b.size * 2){
    			bubbles[i] = new Bubble;
    		}
    		b.yPos -= b.speed;	
    	});
    	requestAnimationFrame(makeBubble);
    };     

});
function randomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
 };	
