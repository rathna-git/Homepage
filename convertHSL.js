function convertHsl(r,g,b){
  	var h;
  	var s;
  	
 	
 	var r1 = r/255;
 	var g1 = g/255;
 	var b1 = b/255; 

  	var maxValue = Math.max(r1, g1, b1);
  	var minValue = Math.min(r1, g1, b1);

  	var l = Math.round(((minValue + maxValue)/2) * 100);

  	if (maxValue == minValue){
  		s = 0;
  	}

  	if ( l < 0.5 ) {
        s = Math.round((maxValue - minvalue)/(maxValue + minValue) * 100);
  	} else {
  		s = Math.round((maxValue - minValue)/(2.0-maxValue - minValue) * 100);
  	}

  	if ( r1 == maxValue){
  		h = Math.round(((g1 - b1)/(maxValue - minValue)) * 60);
  	} else if ( g1 == maxValue){
  		h = Math.round(((2.0 + (b1 - r1))/(maxValue - minValue)) * 60);
  	} else {
  		h = Math.round(((4.0 + (r1 - g1))/(maxValue - minValue)) * 60);
  	}

    if (h<0){
      h += 360;
    }

   return [h , s, l];

  }