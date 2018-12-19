

	var cs = document.getElementById("plateau");
	var ctx = cs.getContext("2d");
	var drawSnow = function () {
	ctx.drawImage(snow, 0, 0,800,800);
	};
	var snow = new Image();
	snow.src = "snow1_s.jpg";
	snow.onload = drawSnow;




	var direction = {
	"ArrowRight": 111,
	"ArrowLeft": 306,
	"ArrowUp": 0,
	"ArrowDown": 210
	};
	var sy = direction["ArrowDown"];
	var x = 0;
	var y = 0;

	var choix = function(s){
		switch(s){
		case "ArrowRight":
			
			if (x+8>736){
				x=736;
			}
			else{
				x=x+8;
			}

			break;

		
		case"ArrowLeft" :
			if (x-8<0){
				x=0;
			}
			else{
				x=x-8;
			}
			break;

		case "ArrowUp" :
			if (y-8<0){
				y=0;
			}
			else {
				y=y-8;
			}
			break;
		
		case "ArrowDown" :
			
			if (y+8>536){
				y=536;
			}
			else {
				y=y+8;
			}
		
	}
	};

	var drawSanta = function () {
	ctx.drawImage(santa, 70, sy,70,105,0,0,64,64);
	};


	var moveSanta = function() {
		ctx.drawImage(santa,70,sy,70,105,x,y,64,64);
	};

	document.onkeydown = function (e) {
	if (direction[e.key] === undefined) {
	return;
	}
	sy = direction[e.key];
	choix(e.key);
	ctx.clearRect(0, 0, 800, 800);
	drawSnow();
	moveSanta();
	};


	var santa = new Image();
	santa.src = "santa.png";
	santa.onload = drawSanta;

	
		