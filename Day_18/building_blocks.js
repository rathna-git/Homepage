$(document).ready(function(){

function makeShapes() {
	var shapes = ['square','rightang','leftang','rectdown','circle','triang',
	               'rectup','semitop','rectthick','quartleft','quartright',
	               'paraleft','pararight']
	for (var j=0; j<13; j++){
		var shape = shapes[j];
		addShape(shape);
	}               
}

function addShape(shape){
     for (var i=0; i<8; i++) {
	     $('#toybox').append('<div class="block ' + shape + '"></div>'); 
	 }
};

makeShapes();

$('#toybox').on('mousedown',function(){

  $('#instruction').fadeOut('slow');

})

$(function() {
    $( ".block" ).draggable({
    	containment: "window",
    	snap: true,
    	snapMode: "outer",
    	snapTolerance: 20,
    	stack: '.block',
    })
  });



});