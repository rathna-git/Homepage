   
   	        
 	  


$(document).ready(function(){

	
	for(j=0;j<20;j++){
           
            var id = "#"+j;
		    $('#caterpillar').append('<div id='+ j+' class = "spots"></div>');
 
		    var size = Math.floor(Math.random()*80);
            var height= size;
            var width= size;
            var color = (Math.floor(Math.random()*16777216)).toString(16);
           
   	        $(id).css('height',height);
   	        $(id ).css('width',width);
   	        $(id ).css('background-color','#'+color);
   	        
	        
}
	var mouseX = 0, mouseY = 0;
	
$(document).mousemove(function(e){

    mouseX = e.pageX;
    mouseY = e.pageY;    


});

/*document.addEventListener('touchmove', function(e) {
    	e.preventDefault();

    	mouseX = e.pageX;
		mouseY = e.pageY;
	}, false);

*/



	for(j=0; j<20; j++){	
			moveSpots("#"+j);
	}

	function moveSpots(spotId) {
			var xp = 0, yp =0;
			var speed = Math.floor(Math.random()*80);

			var loop = setInterval(function(){
			// change 12 to alter damping higher is slower
         	xp += (mouseX - xp)/speed;
         	yp += (mouseY - yp)/speed;


			$(spotId).css({left:xp +'px', top:yp +'px'});  
	
		}, 30);	
	}
	
});    



