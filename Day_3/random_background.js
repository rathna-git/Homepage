$(document).ready(function(){

  $("#singlebutton").click(function(){
        $("body").css('background-color', function random_color(){
           return '#'+ (Math.floor(Math.random()*16777216)).toString(16);
            });
    });
});