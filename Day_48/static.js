$(document).ready(function(){
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');
	
	var	h = canvas.height,
		w = canvas.width,
		id = ctx.createImageData(w, h),
		data = id.data,
		color = 'mono';

		data[0] = 0;
		data[1] = 0;
		data[2] = 0;
		data[3] = Math.random();

	function setPixel(id,x,y,r,g,b,a){
		var index = ( y * id.width + x ) * 4;
		id.data[index+0] = r;
		id.data[index+1] = g;
		id.data[index+2] = b;
		id.data[index+3] = a;

	};

	function init() {
		var posX = 0,
			posY = 0;

		for (var i = 0; i < (h * w); i++){
			var r, g, b, a;

			if(color == 'multi'){
				r = Math.random() * 256 | 0;
				g = Math.random() * 256 | 0;
				b = Math.random() * 256 | 0;
			} else if ( color == 'mono'){
				var shade = Math.random() * 256 | 0;
				r = shade;
				g = shade;
				b = shade;
			}

			setPixel(id,posX,posY,r,g,b,255); // a is full opacity

			posX++;

			if (posX % w == 0) {
				posX = 0;
				posY++;
			}
		}
		ctx.putImageData(id, 0, 0);

		setTimeout(init, 80);
		
	};

	init();

	$('#white').on('click', function(){
		color = 'mono';
	});

	$('#color').on('click', function(){
		color = 'multi';
	});




});