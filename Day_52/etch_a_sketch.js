(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function(){
	var canvas=document.getElementById('canvas'),
		ctx=canvas.getContext('2d'),
		w = 590,
		h = 360,
		moveX = 0,
		moveY = 0;

	    canvas.height = h,
		canvas.width = w;

		(function(cursor, $, undefined){
			var size = 3;

			cursor.x = w/2 - size/2;
			cursor.y = h/2 - size/2;

			cursor.draw = function(x, y){
				ctx.beginPath();
				ctx.moveTo(cursor.x, cursor.y);

				cursor.x += 3 * x;
				cursor.y += 3 * y;

				if(cursor.x <=0){
					cursor.x = 0;
				} else if (cursor.x >= w){
					cursor.x = w;
				}
				if(cursor.y <= 0){
					cursor.y = 0;
				} else if (cursor.y >= h){
					cursor.y = h;
				}

				ctx.lineTo(cursor.x,cursor.y);
				ctx.closePath();
				ctx.stroke();
			}
		}( window.cursor = window.cursor || {}, jQuery ));


	var shake = 0,
		curX, curY,
		oldX, oldY,
		dir = false;

    $('#etch_frame').draggable({
    	revert: true,
    	revertDuration: 200,
    	scroll: false,
    	start: function(e){
    		oldX = e.pageX;
    		oldY = e.pageY;

    		timer = setInterval(function(){
    			shake --;
    			if(shake <= 0){
    				shake = 0;
    			}
    		}, 300);

    	},
    	drag: function(e){
    		var oldDir = dir;
    		curX = e.pageX;
    		curY = e.pageY;

    		if (curX > oldX + 50 || curY > oldY + 50){
    			dir = 'pos';
    		} else if (curX < oldX - 50 || curY < oldY - 50){
    			dir = 'neg';
    		} else {
    			dir = false;
    		}
    		oldX = curX;
    		oldY = curY;

    		if (oldDir != dir && oldDir != false){
    			shake++;
    		}
    		if(shake > 5){
    			ctx.clearRect(0, 0, w, h);
    		}
    	},
    	stop: function(){
    		shake = 0,
    		curX = curY = 0,
    		oldX = oldY = 0,
    		dir = false;
    		clearInterval(timer);
    	}

    });

	$(document).on('keydown',function(e){

		if(e.keyCode == 37){
			moveX = -1;
		} else if(e.keyCode == 38){
			moveY = -1;
		} else if (e.keyCode == 39){
			moveX = 1;
		} else if (e.keyCode == 40){
			moveY = 1;
		}

		cursor.draw(moveX, moveY);

		$(document).on('keyup',function(e){

			if(e.keyCode == 37){
				moveX = 0;
			} else if(e.keyCode == 38){
				moveY = 0;
			} else if (e.keyCode == 39){
				moveX = 0;
			} else if (e.keyCode == 40){
				moveY = 0;
			}

		});

	});


	setTimeout(function(){
		$('.modal').fadeOut(2000);
	},2500);

	$('#info').on('click',function(){
		$('.modal').show();
	});

	$('.close').on('click',function(){
		$('.modal').hide();
	});



	$('body').disableSelection();	
});