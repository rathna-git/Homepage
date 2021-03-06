$(document).ready(function(){
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');

	var	h = canvas.height,
		w = canvas.width,
		tiles = [];

	function Tile(x, y, color){
		this.x = x;
		this.y = y;
		this.color = color;
	};

	function makeTile (){
		ctx.clearRect( 0, 0, w, h);
		_.each(tiles, function(tile){
			ctx.fillStyle = tile.color;
			ctx.fillRect(tile.x, tile.y, 10, 10);
		});
	};

	function init(){
		var posX = 0,
			posY = 0;

		for(i=0; i < h*w/100; i++){
			tiles.push(new Tile(posX, posY, randomColor()));

			posX += 10;
			if ( posX % w/10 == 0){
				posX = 0;
				posY += 10;
			}
		}
		makeTile();
	};

init();

	function fight(){
		var choices = ['rock', 'paper', 'scissors'];
		_.each(tiles, function(tile, i){
			var tileChoice = choices[Math.floor(Math.random() * 3)],
				opponents = [tiles[i+1], tiles[i-1], tiles[i+w/10], tiles[i-w/10]],
				tile = tile;

			_.each(opponents, function(opp, i){

				if (opp == undefined){
					opponents.splice(i, 1);
				}
	
				var oppChoice = choices[Math.floor(Math.random()* 3)];

				if( tileChoice == 'rock' && oppChoice == 'scissors' || 
					tileChoice == 'paper' && oppChoice == 'rock' || 
					tileChoice == 'scissors' && oppChoice =='paper') {

					if (opp != undefined) {
						opp.color = tile.color;
					}

				} else {
					if (opp != undefined){
						tile.color = opp.color;
					}
				}

			});
	    });

		makeTile();	
	};

	$('button').on('click',function() {
		$('.modal').fadeOut(100);
		setTimeout(function(){
			setInterval(fight, 100);
		}, 500);
	});

});

function randomColor(){
	return '#' + Math.random().toString(16).slice(2, 8);
}	