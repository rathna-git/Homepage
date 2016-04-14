(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function(){

	var curNum = '',
		exp ='',
		ans;


	for(i=0; i<4; i++){
		for(j=0; j<5; j++){
			var num = j + (i * 5);
			$('#btn_container').append('<div class="btn_box" id="btn'+ num +'"></div>');
		}
	}
	$('#btn0').css('background','#ff944d');
	$('#btn16').css({'background':'#262626','cursor':'default'});
	$('#btn19').css('background','#5cd6d6');

	var btn_txt =['AC','C','+/-','/','7','8','9','x','4','5','6','-','1','2','3','+','.','0','.','='];

	for(k=0; k < btn_txt.length; k++){
		$('#btn'+ k).text(btn_txt[k]);		
	};

	$('#input_field').focus();

	$('#btn3,#btn7,#btn11,#btn15').addClass('operator');
	$('#btn2,#btn4,#btn5,#btn6,#btn8,#btn9,#btn10,#btn12,#btn13,#btn14,#btn17,#btn18').addClass('num');
	$('#btn19').addClass('run');

	$('#btn0').on('click', function(){
		curNum = '';
		exp = '';
		displayNum(curNum);
		$('#input_field').focus();

	});

	$('#btn1').on('click', function(){
		curNum = '';
		displayNum(curNum);
		$('#input_field').focus();

	});


	$('.num').on('click',function(){
		var txt = $(this).text();
		updateNum(txt);
	});

	$('.operator').on('click',function(){
		var op = $(this).text();
		if (op =='x'){
			op = '*';
		};
		updateExp(op);
	});

	$('.run').on('click',function(){
		evalExp();
	});


	var key_map = {
		'13': 'enter',
		'48': '0',
		'49': '1',
		'50': '2',
		'51': '3',
		'52': '4',
		'53': '5',
		'54': '6',
		'55': '7',
		'56': '8',
		'57': '9',
		'106': '*',
		'107': '+',
		'109': '-',
		'111': '/',
		'110': '.',
		'96': '0',
		'97': '1',
		'98': '2',
		'99': '3',
		'100': '4',
		'101': '5',
		'102': '6',
		'103': '7',
		'104': '8',
		'105': '9',
		'61': '+',
		'187': '+',
		'173': '-',
		'189': '-',
		'191': '/',
		'190': '.',
	}

	$('#input_field').on('keydown',function(e){
		e.preventDefault();
	});

	$('#input_field').on('keyup',function(e){
		e.preventDefault();
		key = e.which;
		if(e.which == 8 || e.which == 46){
			key ='delete';
			curNum = '';
			exp = $('#input_field').val();
			exp = exp.substr(0, exp.length - 1);
			$('#input_field').val(exp);
		} else {
			key = key_map[String(key)]
		}

		if(key === '8'){
			key = e.shiftKey ? '*' : 8;
		}

		if(key){
			determineType(key);
		}
	});


	function updateNum(num){
		if(num == "."){
			if (curNum.indexOf('.') !== -1){
			 ;	
			 } else {
				curNum += num;
			}
		} else if (num == '+/-'){
			if (curNum.indexOf('-') !== -1){
				curNum = curNum.substr(1);
			} else {
				curNum = ( 0 - curNum).toString();
			}
		} else {
			curNum += num ;
		}

		displayNum();
	};


	function determineType(key){
		if(key == '*' || key == '-' || key == '+' || key == '/'){
			updateExp(key);
		} else if (key == 'enter'){
			evalExp();
		} else if (key != 'delete'){
			updateNum(key);
		}
	};

	function updateExp(operator){
		exp = exp + curNum + operator;
		curNum='';

		displayNum();
	};

	function displayNum(){
		$('#input_field').val(exp + curNum);
		
	};

	function evalExp(){
		updateExp('');

		var test = parseFloat(exp.substr(exp.length-1));
		
		if (isNaN(test)){
			alert('Looks like there\'s a problem.');
			$('#input_field').val('');
			curNum='';
			ans='';
		}else {
			ans = eval(exp) * 1e6;
			ans = Math.round(ans, 6);
			ans = ans/1e6;

			if (ans == Infinity || ans == -Infinity){
				alert('Oh Crap! Did you divide by Zero?');
				curNum = '';
				ans = '';
			} else {
				$('#input_field').val(ans);
				curNum = ans;
			}

			exp = '';

		}
	};

	$('body').disableSelection();
});








