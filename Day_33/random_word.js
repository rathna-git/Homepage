$(document).ready(function(){
	var run = true;
  var words = getRandomwords();
	var start;

  startWords();

  $('.button').on('click',function(){
  	
  	if(run){
  		stopWords();
  	} else {
  		startWords();
  	}

  });

   function startWords(){
     start = setInterval(function(){
     	     run = true;
             $('.button').val('Stop').removeClass('start').addClass('stop');
             $('#word_container').text(words[Math.floor(Math.random() * words.length)]);

    },50);
   }

   function stopWords(){
   	    run = false;
   	 	$('.button').val('Start').removeClass('stop').addClass('start');
   	 	clearInterval(start);
   }

   function getRandomwords(){
   	 var array;

   	 $.ajax({
   	 	type: 'GET',
   	 	//url: 'http://randomword.setgetgo.com/get.php',
      url:'http://localhost:8000/words.html',
   	 	async: false,
   	 	success: function(data){
   	 		array = data.split("\n");
   	 	}

   	 });
   	 return array;
   };

});