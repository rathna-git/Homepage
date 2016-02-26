$(document).ready(function(){
  $('#coin_container').draggable({
  	helper: 'clone'
  });
  $('#cat-body').droppable({
  	drop: function(event,ui){
  		dropCoin();
  	} 	  
 });
 
  function dropCoin(){
  	//$('#coin_container').fadeOut(300);
    document.getElementById('sound').innerHTML="<audio autoplay><source src='audio/coin.mp3' type='audio/mpeg'></audio>";
  	//setTimeout(function(){
  		//replaceCoin();	
  		//},1000);
  }

  /* function replaceCoin(){
       $('#coin_container').css({top:400, left:200});
  	   $('#coin_container').show();
  }*/

});