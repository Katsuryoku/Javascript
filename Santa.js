
	var cs = document.getElementById("cv");
	var ctx = cs.getContext("2d");
	var santa = new Image();
	santa.src = "santa.png";

class Santa {


	constructor(){
		this.x = 0 ;
		this.y = 0 ; 
		this.direction = {
		"ArrowRight": 111,
		"ArrowLeft": 306,
		"ArrowUp": 0,
		"ArrowDown": 210
		};
		this.sy = direction["ArrowDown"];
		this.countRight = 0;
		this.countLeft = 0;
		this.countUp = 0;
		this.countDown = 0;
	}


	

	drawSanta() {
	ctx.drawImage(santa, 70, this.sy,70,105,0,0,64,64);
	}

	moveSanta(e) {
		choix(e);
		ctx.drawImage(santa,70,this.sy,70,105,this.x,this.y,64,64);
	}

	choix (s){
			switch(s){
			case "ArrowRight":
				
				if (this.x+8>736){
					this.x=736;
				}
				else{
					this.x=this.x+8;
				}

				break;

			
			case"ArrowLeft" :
				if (this.x-8<0){
					this.x=0;
				}
				else{
					this.x=this.x-8;
				}
				break;

			case "ArrowUp" :
				if (this.y-8<0){
					this.y=0;
				}
				else {
					this.y=this.y-8;
				}
				break;
			
			case "ArrowDown" :
				
				if (this.y+8>536){
					this.y=536;
				}
				else {
					this.y=this.y+8;
				}
			
		}
	}



}