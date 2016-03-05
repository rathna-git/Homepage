$(document).ready(function(){
    var canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    var clickX = [ ];
    var clickY = [ ];
    var clickColor = [ ];
    var clickDrag = [ ];
    var clickTool = [ ]; 
    var clickSize = [ ];
    var curColor = "black";
    var paint;
    var smallSize = 2;
    var normalSize = 5;
    var largeSize = 10;
    var hugeSize = 30;
    var crayon;
    var eraser;
    var marker;
    var curTool;
    var crayonTextureImage = new Image();
    crayonTextureImage.src = "images/crayon-texture.png";
    
    // color picker
     
    $('.box').on('click', function(){
     var x = $(this).css('backgroundColor');
     hexc(x);
    });
    
    function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    curColor = '#' + parts.join('');
    };
    
    // brush sizes

    var curSize = normalSize;
    $('.brush_size').on('click',function(){
    	if ( $(this).attr('id') == 'small'){
    		curSize = smallSize;
    	} else if ( $(this).attr('id') == 'normal'){
    		curSize = normalSize;
    	} else if ( $(this).attr('id') == 'large'){
    		curSize = largeSize;
    	} else {
    		curSize = hugeSize;
    	}
    });


    // Tools 

   $('.tool_pick').on('click', function(){
     if ($(this).attr('id') == 'crayon'){
   	   curTool = 'crayon';
   	   console.log('crayon');
     } else if ($(this).attr('id') == 'eraser'){
   	   curTool = 'eraser';
   	   console.log(curTool);
     } else {
   	   curTool = 'marker';
   	   console.log('marker');
     }
   });
    

 /////Mouse Events///////

    $('#canvas').mousedown(function(e){
    	var mouseX = e.pageX - this.offsetLeft;
    	var mouseY = e.pageY - this.offsetTop;

    	paint = true;

    	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    	redraw();
    });

    $('#canvas').mousemove(function(e){

    	this.style.cursor = 'pointer';
        if(paint){
        	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        	redraw();
        }     
    });

    $('#canvas').mouseup(function(e){
    	paint = false;
    });

    $('#canvas').mouseleave(function(e){
    	paint = false;
    });
    
   
    $('#clear_all').on('click',function(){

       if (confirm ('Are you sure you want to erase everything?')){
         context.clearRect(0, 0, context.canvas.width, context.canvas.height);
         removeValues();
       }
    });


    function addClick(x, y, dragging){
    	clickX.push(x);
    	clickY.push(y);
    	clickDrag.push(dragging);
    	clickTool.push(curTool);
    	clickColor.push(curColor);
    	clickSize.push(curSize);

    }

    function removeValues(){
    	clickX.length = 0;
    	clickY.length = 0;
	    clickDrag.length = 0;
	   	clickTool.length = 0;
	   	clickColor.length = 0;
	   	clickSize.length = 0;
    }

    function redraw() {

    	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        
    	for(var i=0; i < clickX.length; i++) {

    		context.beginPath();
    		if(clickDrag[i] && i){
    			context.moveTo(clickX[i-1], clickY[i-1]);
    		}else{
    			context.moveTo(clickX[i]-1, clickY[i]);
    		}
    		context.lineTo(clickX[i], clickY[i]);
    		context.closePath();

    		if (clickTool[i] == 'eraser') {

    		context.strokeStyle = "#ffffff";

    	    } else if (clickTool[i] == 'crayon'){

   		    context.drawImage(crayonTextureImage, 0, 0, context.canvas.width, context.canvas.height);
		    context.strokeStyle = clickColor[i];

    	    } else {

    		context.strokeStyle = clickColor[i];
    	    }  
            
            context.lineWidth = clickSize[i];
    		context.lineJoin = "round";
    		context.stroke();
    	}
    	    context.restore();         
    }
});









