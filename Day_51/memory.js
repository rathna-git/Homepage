(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function(){

	var cards = [ ],
		clickCount = 0,
		firstChoice,
		firstElement,
		secondElement,
		attempts = 0,
		matches = 0,		
		images = ['images/img1.jpeg','images/img2.jpg','images/img3.jpeg','images/img4.jpeg',
				 'images/img5.jpg','images/img6.jpeg','images/img7.jpg','images/img8.jpeg',
				 'images/img9.jpg','images/img10.jpeg','images/img11.jpeg','images/img12.jpg',
				 'images/img13.jpeg','images/img14.jpg','images/img15.png','images/img1.jpeg','images/img2.jpg',
				 'images/img3.jpeg','images/img4.jpeg','images/img5.jpg','images/img6.jpeg','images/img7.jpg',
				 'images/img8.jpeg','images/img9.jpg','images/img10.jpeg','images/img11.jpeg','images/img12.jpg',
				 'images/img13.jpeg','images/img14.jpg','images/img15.png'];

for(i=0; i<5; i++){
	for(j=0; j<6; j++){
		var num = j + (i * 6);

		$('#card_container').append('<div class="class_card back " id="'+ num +'"></div>');

	}

}

setTimeout(function(){
	 $('.class_card').removeClass('.back');
	 $('.class_card').append('<img class="chevron" src="images/chevron1.png">')
	
},500);

	function Card(row, col, img, id){
		this.row = row;
		this.col = col;
		this.img = img;
		this.id = id;

	};

	function arrangeCards(k){
		var insert = true;

		r_col = Math.floor(Math.random() * 6);
		r_row = Math.floor(Math.random() * 5);
		r_img = images[k];

		_.each(cards, function(card){
			if(r_col == card.col && r_row == card.row){
				insert = false;
			} 
		});

		if(insert){
		 	var num = r_col + (r_row * 6);
		 	cards.push(new Card(r_row, r_col, r_img, num));
		 	$('#'+ num).append('<img class="img_display" src="' + r_img + '">');
		} else{
			arrangeCards(k);
		};
	};


	function init() {
		for (i=0; i < images.length; i++) {
			arrangeCards(i);	
		}

		$('.class_card').dblclick(function(e){
		e.stopPropagation();
		e.preventDefault();

		return false;
	});


	};

	init();	

	$('.class_card').on('click',function(){


		clickCount++;
		var id = this.id;
		console.log(id);
		var r_row = parseInt(id / 6);
		var r_col = id % 6;
		console.log(r_row, r_col);
		jQuery(this).find('.chevron').hide();
		jQuery(this).find("img:first-child").removeClass('img_display');


			if (clickCount == 1){
				
				firstChoice= _.find(cards, {row: r_row, col: r_col});
				console.log('firstChoice: '+firstChoice.img);
				firstElement = jQuery(this);
				


			} else if (clickCount == 2){
				
				var secondChoice= _.find(cards, {row: r_row, col: r_col});
				console.log('secondChoice: '+secondChoice.img);
				secondElement = jQuery(this);
				
			
				clickCount = 0;
					

				if (firstChoice.img == secondChoice.img) {
			 		matches ++;
			 		$('#matches').text('Matches: '+ matches);
			 		secondElement.off('click');
			 		firstElement.off('click');
			 		
			 		
				} else {
					  attempts++;
					  $('#attempt').text('Attempts: '+ attempts);
					  

					 	setTimeout(function(){
						 	secondElement.find("img:first-child").addClass('img_display');
			       		    secondElement.find('.chevron').show();
			       		    
			       		    firstElement.find("img:first-child").addClass('img_display');
			       		    firstElement.find('.chevron').show();    

		       		    },600);

		       		    secondElement.on('click');
			 		    firstElement.on('click');
		   		}
		   	
		   	}    

 if((matches * 2) == images.length){
 	var accuracy = Math.round((matches / attempts) * 100).toFixed(2);

            $('#end h2:nth-child(2)').text('Matches: ' + matches);
			$('#end h2:nth-child(3)').text('Attempts: ' + attempts);
			$('#end h2:nth-child(4)').text('Accuracy: ' + accuracy + '%')
			
			if (accuracy >= 80) {
				$('#end h1').text('Nice Work!');
			} else {
				$('#end h1').text('Better Keep Practicing');				
			}

			$('.modal').fadeIn(200);
 }	

  });	

$('body').disableSelection();


});