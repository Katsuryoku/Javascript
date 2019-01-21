
	var cs = document.getElementById("cv");
	var ctx = cs.getContext("2d");
	var santaIm = new Image();
	santaIm.src = "santa.png";

class Santa {


	constructor(){
		this.x = 360 ;
		this.y = 260 ; 
		this.direction = {
		"ArrowRight": 111,
		"ArrowLeft": 306,
		"ArrowUp": 10,
		"ArrowDown": 215
		};
		this.sy = this.direction["ArrowDown"];
		this.countRight = 0;
		this.countLeft = 0;
		this.countUp = 0;
		this.countDown = 0;
	}


	

	drawSanta() {
		if(this.sy===111 || this.sy===306 || this.sy===10 || this.sy===215) {
			ctx.drawImage(santaIm, 70, this.sy,70,100,this.x,this.y,70,105);
		}
		else{
			ctx.drawImage(santaIm, 70, 215,70,100,this.x,this.y,70,105);
		}
	}

	choix (s){
			switch(s){
			case "ArrowRight":
				this.countRight=(this.countRight+1)%9;
				
				if (this.x+8>730){
					this.x=730;
				}
				else{
					this.x=this.x+8;
				}

				return this.countRight;
				break;

			
			case"ArrowLeft" :
				this.countLeft=(this.countLeft+1)%9;
				if (this.x-8<0){
					this.x=0;
				}
				else{
					this.x=this.x-8;
				}
				return this.countLeft
				break;

			case "ArrowUp" :
				this.countUp=(this.countUp+1)%9;
				if (this.y-8<0){
					this.y=0;
				}
				else {
					this.y=this.y-8;
				}
				return this.countUp;
				break;
			
			case "ArrowDown" :
				this.countDown=(this.countDown+1)%9;
				if (this.y+8>495){
					this.y=495;
				}
				else {
					this.y=this.y+8;
				}
				return this.countDown;
				break;

			default : 
				return 0;
			
		}
	}

	moveSanta(e) {
		var count = this.choix(e);
		switch(count){
			case 0 :
			case 1 :
			case 2 :
				ctx.drawImage(santaIm,70,this.sy,70,100,this.x,this.y,70,105);
				break;
			
			case 3:
			case 4:
			case 5:
				ctx.drawImage(santaIm,0,this.sy,70,95,this.x,this.y,70,105);
				break;
			
			case 6 :
			case 7 :
			case 8 :
				ctx.drawImage(santaIm,140,this.sy,70,95,this.x,this.y,70,105);
				break;
		}
	}





}